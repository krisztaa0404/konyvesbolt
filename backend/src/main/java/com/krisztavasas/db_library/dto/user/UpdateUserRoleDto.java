package com.krisztavasas.db_library.dto.user;

import com.krisztavasas.db_library.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRoleDto(
        @NotNull(message = "Role is required")
        UserRole role
) {
}
