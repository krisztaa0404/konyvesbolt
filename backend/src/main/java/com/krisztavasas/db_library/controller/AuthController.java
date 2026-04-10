package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.auth.AuthResponseDto;
import com.krisztavasas.db_library.dto.auth.LoginRequestDto;
import com.krisztavasas.db_library.dto.auth.LogoutRequestDto;
import com.krisztavasas.db_library.dto.auth.RefreshTokenRequestDto;
import com.krisztavasas.db_library.dto.auth.RefreshTokenResponseDto;
import com.krisztavasas.db_library.dto.auth.RegisterRequestDto;
import com.krisztavasas.db_library.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponseDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(authService.getCurrentUser(email));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponseDto> refresh(@Valid @RequestBody RefreshTokenRequestDto request) {
        RefreshTokenResponseDto response = authService.refreshAccessToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody(required = false) LogoutRequestDto request) {
        String refreshToken = request != null ? request.refreshToken() : null;
        authService.logout(refreshToken);
        return ResponseEntity.noContent().build();
    }
}
