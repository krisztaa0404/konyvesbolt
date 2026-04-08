package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.dto.common.AddressDto;
import com.krisztavasas.db_library.dto.user.UserDto;
import com.krisztavasas.db_library.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderDetailDto(
        UUID id,
        UserDto user,
        LocalDateTime orderDate,
        OrderStatus status,
        BigDecimal totalAmount,
        BigDecimal discountAmount,
        AddressDto shippingAddress,
        PaymentInfoDto paymentInfo,
        List<OrderItemDto> items,
        LocalDateTime updatedAt
) {
}
