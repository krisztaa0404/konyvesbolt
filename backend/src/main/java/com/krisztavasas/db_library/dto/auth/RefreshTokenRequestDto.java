package com.krisztavasas.db_library.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequestDto(
    @NotBlank String refreshToken
) {}
