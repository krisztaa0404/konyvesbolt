package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record OrderDto(
        UUID id,
        UUID userId,
        String userEmail,
        String customerName,
        LocalDateTime orderDate,
        OrderStatus status,
        BigDecimal totalAmount,
        BigDecimal discountAmount,
        Integer itemCount
) {
}
