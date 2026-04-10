package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.exception.InvalidRefreshTokenException;
import com.krisztavasas.db_library.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final UserRepository userRepository;

    @Transactional
    public String generateRefreshToken(User user) {
        String plainToken = UUID.randomUUID() + "-" + System.currentTimeMillis();

        String hashedToken = hashToken(plainToken);

        user.setRefreshToken(hashedToken);
        user.setRefreshTokenExpiresAt(LocalDateTime.now().plusDays(7));
        userRepository.save(user);

        return plainToken;
    }

    @Transactional(readOnly = true)
    public User validateRefreshToken(String plainToken) {
        String hashedToken = hashToken(plainToken);

        User user = userRepository.findByRefreshToken(hashedToken)
            .orElseThrow(() -> new InvalidRefreshTokenException("Invalid refresh token"));

        if (user.getRefreshTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new InvalidRefreshTokenException("Refresh token expired");
        }

        return user;
    }

    @Transactional
    public void revokeRefreshToken(User user) {
        user.setRefreshToken(null);
        user.setRefreshTokenExpiresAt(null);
        userRepository.save(user);
    }

    private String hashToken(String plainToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(plainToken.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}
