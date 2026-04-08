package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.dto.common.AddressDto;
import com.krisztavasas.db_library.validation.ValidOrderDiscount;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CreateOrderDto(
        @NotNull(message = "Order items are required")
        @NotEmpty(message = "Order must contain at least one item")
        @Valid
        List<CreateOrderItemDto> items,

        @NotNull(message = "Shipping address is required")
        @Valid
        AddressDto shippingAddress,

        @Valid
        PaymentInfoDto paymentInfo,

        @ValidOrderDiscount
        UUID discountId
) {
}
