package com.krisztavasas.db_library.dto.user;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdateLoyaltyDto(
        @NotNull(message = "Loyalty member status is required")
        Boolean isLoyaltyMember,

        @DecimalMin(value = "0", message = "Discount percent must be at least 0")
        @DecimalMax(value = "100", message = "Discount percent must not exceed 100")
        BigDecimal discountPercent
) {
}
