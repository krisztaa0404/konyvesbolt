package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.user.ChangePasswordDto;
import com.krisztavasas.db_library.dto.user.CreateUserDto;
import com.krisztavasas.db_library.dto.user.UpdateUserDto;
import com.krisztavasas.db_library.dto.user.UserSearchFilterDto;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.enums.UserRole;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.UserRepository;
import com.krisztavasas.db_library.repository.UserSpecification;
import com.krisztavasas.db_library.valueobject.UserPreferences;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserSpecification userSpecification;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> searchWithFilters(UserSearchFilterDto filter, Pageable pageable) {
        Specification<User> spec = userSpecification.withFilters(
                filter.search(), filter.role(), filter.isLoyaltyMember()
        );
        return userRepository.findAll(spec, pageable);
    }

    @Transactional
    public User createUser(CreateUserDto dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new DataIntegrityViolationException("Email already exists");
        }

        User user = User.builder()
                .email(dto.email())
                .passwordHash(passwordEncoder.encode(dto.password()))
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .phone(dto.phone())
                .role(dto.role())
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User updateProfile(String email, UpdateUserDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (dto.firstName() != null) user.setFirstName(dto.firstName());
        if (dto.lastName() != null) user.setLastName(dto.lastName());
        if (dto.phone() != null) user.setPhone(dto.phone());
        if (dto.preferences() != null) {
            user.setPreferences(new UserPreferences(
                    dto.preferences().newsletter(),
                    dto.preferences().favoriteGenres(),
                    dto.preferences().notificationEmail()
            ));
        }

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(String email, ChangePasswordDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!passwordEncoder.matches(dto.currentPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(dto.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void deleteAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setDeletedAt(java.time.LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public User updateRole(UUID id, UserRole role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        user.setRole(role);
        return userRepository.save(user);
    }

    @Transactional
    public User updateLoyaltyStatus(UUID id, Boolean isLoyaltyMember, BigDecimal discountPercent) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        user.setIsLoyaltyMember(isLoyaltyMember);
        if (isLoyaltyMember) {
            user.setLoyaltyDiscountPercent(discountPercent != null ? discountPercent : BigDecimal.ZERO);
        } else {
            user.setLoyaltyDiscountPercent(BigDecimal.ZERO);
        }

        return userRepository.save(user);
    }

    @Transactional
    public void updateTotalSpent(User user, BigDecimal amount) {
        user.setTotalSpent(user.getTotalSpent().add(amount));
        userRepository.save(user);
    }
}
