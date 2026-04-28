package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.order.CreateOrderDto;
import com.krisztavasas.db_library.dto.order.OrderDetailDto;
import com.krisztavasas.db_library.dto.order.OrderDto;
import com.krisztavasas.db_library.dto.order.OrderFilterDto;
import com.krisztavasas.db_library.dto.order.UpdateOrderStatusDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.enums.DiscountScopeType;
import com.krisztavasas.db_library.entity.Order;
import com.krisztavasas.db_library.entity.OrderItem;
import com.krisztavasas.db_library.enums.OrderStatus;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.exception.InsufficientStockException;
import com.krisztavasas.db_library.mapper.OrderMapper;
import com.krisztavasas.db_library.mapper.ValueObjectMapper;
import com.krisztavasas.db_library.repository.BookRepository;
import com.krisztavasas.db_library.repository.OrderItemRepository;
import com.krisztavasas.db_library.service.BookService;
import com.krisztavasas.db_library.service.OrderService;
import com.krisztavasas.db_library.service.SeasonalDiscountService;
import com.krisztavasas.db_library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderFacade {

    private final OrderService orderService;
    private final BookService bookService;
    private final UserService userService;
    private final SeasonalDiscountService seasonalDiscountService;
    private final OrderMapper orderMapper;
    private final ValueObjectMapper valueObjectMapper;
    private final OrderItemRepository orderItemRepository;
    private final BookRepository bookRepository;

    @Transactional
    public OrderDetailDto createOrder(String userEmail, CreateOrderDto dto) {
        User user = userService.findByEmail(userEmail);

        List<OrderItem> orderItems = new ArrayList<>();
        List<Book> booksInOrder = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (var itemDto : dto.items()) {
            Book book = bookService.findByIdForUpdate(itemDto.bookId());

            if (book.getStockQuantity() < itemDto.quantity()) {
                throw new InsufficientStockException(
                        "Insufficient stock for book: " + book.getTitle() +
                        ". Available: " + book.getStockQuantity() +
                        ", Requested: " + itemDto.quantity()
                );
            }

            OrderItem orderItem = OrderItem.builder()
                    .book(book)
                    .format(itemDto.format())
                    .quantity(itemDto.quantity())
                    .unitPrice(book.getPrice())
                    .subtotal(book.getPrice().multiply(BigDecimal.valueOf(itemDto.quantity())))
                    .build();

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(orderItem.getSubtotal());
            booksInOrder.add(book);
        }

        BigDecimal discountAmount = BigDecimal.ZERO;
        SeasonalDiscount appliedDiscount = null;

        if (dto.discountId() != null) {
            appliedDiscount = seasonalDiscountService.validateDiscountForOrder(
                    dto.discountId(),
                    booksInOrder,
                    totalAmount
            );

            if (appliedDiscount.getScopeType() == DiscountScopeType.ALL_BOOKS) {
                discountAmount = totalAmount
                        .multiply(appliedDiscount.getPercentage())
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            } else {
                Set<UUID> discountedBookIds = appliedDiscount.getApplicableBooks().stream()
                        .map(Book::getId)
                        .collect(Collectors.toSet());

                for (OrderItem item : orderItems) {
                    if (discountedBookIds.contains(item.getBook().getId())) {
                        BigDecimal itemDiscount = item.getSubtotal()
                                .multiply(appliedDiscount.getPercentage())
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                        discountAmount = discountAmount.add(itemDiscount);
                    }
                }
            }
        } else if (user.getIsLoyaltyMember() &&
                user.getLoyaltyDiscountPercent().compareTo(BigDecimal.ZERO) > 0) {
            discountAmount = totalAmount
                    .multiply(user.getLoyaltyDiscountPercent())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        }

        totalAmount = totalAmount.subtract(discountAmount);

        for (int i = 0; i < booksInOrder.size(); i++) {
            UUID bookId = booksInOrder.get(i).getId();
            int quantity = orderItems.get(i).getQuantity();
            bookService.updateStockBatch(bookId, -quantity, quantity);
        }

        Order order = orderService.createOrderEntity(
                user,
                orderItems,
                totalAmount,
                discountAmount,
                appliedDiscount,
                valueObjectMapper.toShippingAddress(dto.shippingAddress()),
                dto.paymentInfo() != null ? valueObjectMapper.toValueObject(dto.paymentInfo()) : null
        );

        if (appliedDiscount != null) {
            seasonalDiscountService.incrementUsageCount(appliedDiscount);
        }

        userService.updateTotalSpent(user, totalAmount);

        return orderMapper.toDetailDto(order);
    }

    public OrderDetailDto findById(UUID id) {
        Order order = orderService.findEntityById(id);
        return orderMapper.toDetailDto(order);
    }

    public OrderDetailDto findByIdForUser(UUID id, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Order order = orderService.findEntityById(id);

        if (!order.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Order not found");
        }

        return orderMapper.toDetailDto(order);
    }

    public Page<OrderDto> findByUserEmail(String userEmail, Pageable pageable) {
        User user = userService.findByEmail(userEmail);
        return orderService.findByUserId(user.getId(), pageable)
                .map(orderMapper::toDto);
    }

    public Page<OrderDto> findAll(Pageable pageable) {
        return orderService.findAllEntities(pageable)
                .map(orderMapper::toDto);
    }

    public Page<OrderDto> findAllWithFilters(OrderFilterDto filter, Pageable pageable) {
        return orderService.findAllWithFilters(filter, pageable)
                .map(orderMapper::toDto);
    }

    @Transactional
    public OrderDetailDto updateStatus(UUID id, UpdateOrderStatusDto dto) {
        Order order = orderService.findEntityById(id);
        Order updatedOrder = orderService.updateOrderStatus(order, dto.status());
        return orderMapper.toDetailDto(updatedOrder);
    }

    @Transactional
    public void cancelOrder(UUID id, String userEmail) {
        User user = userService.findByEmail(userEmail);
        Order order = orderService.findEntityById(id);

        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Cannot cancel another user's order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Only pending orders can be cancelled");
        }

        // Restore stock using batch JPQL updates
        for (OrderItem item : order.getItems()) {
            bookService.updateStockBatch(
                item.getBook().getId(),
                item.getQuantity(),
                -item.getQuantity()
            );
        }

        userService.updateTotalSpent(user, order.getTotalAmount().negate());

        orderService.cancelOrderEntity(order);
    }
}
