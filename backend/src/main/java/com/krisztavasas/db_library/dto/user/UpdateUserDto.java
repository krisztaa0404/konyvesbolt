package com.krisztavasas.db_library.dto.user;

import com.krisztavasas.db_library.dto.common.AddressDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpdateUserDto(
        @Email(message = "Email must be valid")
        @Size(max = 255, message = "Email must not exceed 255 characters")
        String email,

        @Size(max = 100, message = "First name must not exceed 100 characters")
        String firstName,

        @Size(max = 100, message = "Last name must not exceed 100 characters")
        String lastName,

        @Size(max = 20, message = "Phone must not exceed 20 characters")
        String phone,

        @Valid
        List<AddressDto> addressData,

        @Valid
        PreferencesDto preferences
) {
}
