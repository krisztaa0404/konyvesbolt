package com.krisztavasas.db_library.dto.discount;

import com.krisztavasas.db_library.enums.DiscountScopeType;

import java.time.LocalDateTime;

public record DiscountFilterDto(
        String name,
        Boolean isActive,
        DiscountScopeType scopeType,
        LocalDateTime activeAt
) {
}
