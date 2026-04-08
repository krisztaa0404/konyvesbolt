package com.krisztavasas.db_library.dto.user;

import com.krisztavasas.db_library.enums.UserRole;

public record UserSearchFilterDto(
        String search,
        UserRole role,
        Boolean isLoyaltyMember
) {
    public boolean hasAnyFilter() {
        return search != null || role != null || isLoyaltyMember != null;
    }
}
