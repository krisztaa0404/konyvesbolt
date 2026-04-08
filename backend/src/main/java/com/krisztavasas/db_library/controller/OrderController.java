package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.order.CreateOrderDto;
import com.krisztavasas.db_library.dto.order.OrderDetailDto;
import com.krisztavasas.db_library.dto.order.OrderDto;
import com.krisztavasas.db_library.dto.order.OrderFilterDto;
import com.krisztavasas.db_library.dto.order.UpdateOrderStatusDto;
import com.krisztavasas.db_library.facade.OrderFacade;
import com.krisztavasas.db_library.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderFacade orderFacade;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDetailDto createOrder(@Valid @RequestBody CreateOrderDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        return orderFacade.createOrder(email, dto);
    }

    @GetMapping("/my-orders")
    public Page<OrderDto> getMyOrders(
            @PageableDefault(size = 20, sort = "orderDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        String email = SecurityUtils.getCurrentUserEmail();
        return orderFacade.findByUserEmail(email, pageable);
    }

    @GetMapping("/my-orders/{id}")
    public OrderDetailDto getMyOrder(@PathVariable UUID id) {
        String email = SecurityUtils.getCurrentUserEmail();
        return orderFacade.findByIdForUser(id, email);
    }

    @PostMapping("/{id}/cancel")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelOrder(@PathVariable UUID id) {
        String email = SecurityUtils.getCurrentUserEmail();
        orderFacade.cancelOrder(id, email);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public Page<OrderDto> getAllOrders(
            @ModelAttribute OrderFilterDto filter,
            @PageableDefault(size = 20, sort = "orderDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if (filter.hasAnyFilter()) {
            return orderFacade.findAllWithFilters(filter, pageable);
        }
        return orderFacade.findAll(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public OrderDetailDto getOrder(@PathVariable UUID id) {
        return orderFacade.findById(id);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public OrderDetailDto updateOrderStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateOrderStatusDto dto
    ) {
        return orderFacade.updateStatus(id, dto);
    }
}
