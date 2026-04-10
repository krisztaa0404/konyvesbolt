package com.krisztavasas.db_library.dto.discount;

import com.krisztavasas.db_library.enums.DiscountScopeType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Detailed response DTO for a seasonal discount including applicable books and genres.
 * Used for single-discount GET endpoint to provide complete information.
 */
public record DetailedSeasonalDiscountDto(
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
    LocalDateTime updatedAt,
    List<NamedEntityRefDto> books,      // Applicable books with id + name
    List<NamedEntityRefDto> genres      // Derived genres with id + name
) {
}
