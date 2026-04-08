package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.order.OrderFilterDto;
import com.krisztavasas.db_library.entity.Order;
import com.krisztavasas.db_library.entity.OrderItem;
import com.krisztavasas.db_library.enums.OrderStatus;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.repository.OrderSpecification;
import com.krisztavasas.db_library.repository.projection.DashboardMetricsProjection;
import com.krisztavasas.db_library.valueobject.PaymentInfo;
import com.krisztavasas.db_library.valueobject.ShippingAddress;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public Order createOrderEntity(
            User user,
            List<OrderItem> items,
            BigDecimal totalAmount,
            BigDecimal discountAmount,
            SeasonalDiscount appliedDiscount,
            ShippingAddress shippingAddress,
            PaymentInfo paymentInfo
    ) {
        Order order = Order.builder()
                .user(user)
                .shippingAddress(shippingAddress)
                .paymentInfo(paymentInfo)
                .totalAmount(totalAmount)
                .discountAmount(discountAmount)
                .appliedDiscount(appliedDiscount)
                .build();

        for (OrderItem item : items) {
            item.setOrder(order);
            order.getItems().add(item);
        }

        return orderRepository.save(order);
    }

    public Order findEntityById(UUID id) {
        return orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }

    public Page<Order> findByUserId(UUID userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable);
    }

    public Page<Order> findAllEntities(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Page<Order> findAllWithFilters(OrderFilterDto filter, Pageable pageable) {
        Specification<Order> spec = OrderSpecification.withFilters(
                filter.search(),
                filter.statuses(),
                filter.userId(),
                filter.dateFrom(),
                filter.dateTo()
        );
        return orderRepository.findAll(spec, pageable);
    }

    @Transactional
    public Order updateOrderStatus(Order order, OrderStatus status) {
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrderEntity(Order order) {
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    public DashboardMetricsProjection getDashboardMetrics(
            java.time.LocalDateTime startOfToday,
            java.time.LocalDateTime startOfWeek,
            java.time.LocalDateTime startOfMonth,
            String pendingStatus
    ) {
        return orderRepository.getDashboardMetrics(startOfToday, startOfWeek, startOfMonth, pendingStatus);
    }
}
