package com.krisztavasas.db_library.dto.user;

import com.krisztavasas.db_library.dto.common.AddressDto;
import com.krisztavasas.db_library.enums.UserRole;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record UserDto(
        UUID id,
        String email,
        String firstName,
        String lastName,
        String phone,
        UserRole role,
        Boolean isLoyaltyMember,
        BigDecimal loyaltyDiscountPercent,
        BigDecimal totalSpent,
        List<AddressDto> addressData,
        PreferencesDto preferences,
        LocalDateTime registrationDate
) {
}
