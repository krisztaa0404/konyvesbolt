package com.krisztavasas.db_library.dto.discount;

import com.krisztavasas.db_library.enums.DiscountScopeType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record SeasonalDiscountDto(
        UUID id,
        String name,
        String description,
        BigDecimal percentage,
        LocalDateTime validFrom,
        LocalDateTime validTo,
        Boolean isActive,
        DiscountScopeType scopeType,
        Integer maxUsageCount,
        Integer currentUsageCount,
        BigDecimal minimumOrderAmount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
