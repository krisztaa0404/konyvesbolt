package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateOrderStatusDto(
        @NotNull(message = "Status is required")
        OrderStatus status
) {
}
