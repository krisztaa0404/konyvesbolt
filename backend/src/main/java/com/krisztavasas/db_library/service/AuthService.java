package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.auth.AuthResponseDto;
import com.krisztavasas.db_library.dto.auth.LoginRequestDto;
import com.krisztavasas.db_library.dto.auth.RefreshTokenRequestDto;
import com.krisztavasas.db_library.dto.auth.RefreshTokenResponseDto;
import com.krisztavasas.db_library.dto.auth.RegisterRequestDto;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.repository.UserRepository;
import com.krisztavasas.db_library.security.JwtService;
import com.krisztavasas.db_library.valueobject.UserAddress;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        UserAddress userAddress = getUserAddress(request);

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .addressData(userAddress != null ? Collections.singletonList(userAddress) : null)
                .build();

        user = userRepository.save(user);

        return generateAuthResponse(user);
    }

    public AuthResponseDto login(LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return generateAuthResponse(user);
    }

    public RefreshTokenResponseDto refreshAccessToken(RefreshTokenRequestDto request) {
        User user = refreshTokenService.validateRefreshToken(request.refreshToken());

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateToken(userDetails);

        return new RefreshTokenResponseDto(
                accessToken,
                request.refreshToken(),
                3600L
        );
    }

    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            User user = refreshTokenService.validateRefreshToken(refreshToken);
            refreshTokenService.revokeRefreshToken(user);
        }
    }

    public AuthResponseDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return AuthResponseDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }

    private AuthResponseDto generateAuthResponse(User user) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);
        String refreshToken = refreshTokenService.generateRefreshToken(user);

        return AuthResponseDto.builder()
                .token(token)
                .refreshToken(refreshToken)
                .expiresIn(3600L)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }

    private UserAddress getUserAddress(RegisterRequestDto request) {
        UserAddress userAddress = null;
        if (request.getAddressData() != null) {
            userAddress = new UserAddress(
                    request.getAddressData().street(),
                    request.getAddressData().city(),
                    request.getAddressData().state(),
                    request.getAddressData().postalCode(),
                    request.getAddressData().country(),
                    "billing",
                    true
            );
        }
        return userAddress;
    }
}
