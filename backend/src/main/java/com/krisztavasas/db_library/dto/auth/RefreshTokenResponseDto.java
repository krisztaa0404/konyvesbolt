package com.krisztavasas.db_library.dto.auth;

public record RefreshTokenResponseDto(
    String accessToken,
    String refreshToken,
    Long expiresIn
) {}
