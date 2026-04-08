package com.krisztavasas.db_library.dto.discount;

import com.krisztavasas.db_library.validation.ValidDateRange;
import com.krisztavasas.db_library.validation.ValidDiscountScope;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@ValidDiscountScope
@ValidDateRange
public record CreateSeasonalDiscountDto(
        @NotBlank(message = "Name is required")
        @Size(max = 200, message = "Name must not exceed 200 characters")
        String name,

        String description,

        @NotNull(message = "Percentage is required")
        @DecimalMin(value = "0.01", message = "Percentage must be at least 0.01")
        @DecimalMax(value = "100.00", message = "Percentage must not exceed 100")
        @Digits(integer = 3, fraction = 2, message = "Percentage must have at most 3 integer digits and 2 decimal places")
        BigDecimal percentage,

        @NotNull(message = "Valid from date is required")
        LocalDateTime validFrom,

        @NotNull(message = "Valid to date is required")
        LocalDateTime validTo,

        @Min(value = 1, message = "Max usage count must be at least 1")
        Integer maxUsageCount,

        @DecimalMin(value = "0", message = "Minimum order amount cannot be negative")
        BigDecimal minimumOrderAmount,

        List<UUID> bookIds,

        List<UUID> genreIds,

        Boolean allBooks
) {
}
