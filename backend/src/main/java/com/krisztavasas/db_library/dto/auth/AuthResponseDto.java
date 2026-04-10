package com.krisztavasas.db_library.dto.auth;

import com.krisztavasas.db_library.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {

    private String token;
    private String refreshToken;
    private Long expiresIn;
    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}
