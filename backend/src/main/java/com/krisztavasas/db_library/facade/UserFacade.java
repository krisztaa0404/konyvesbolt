package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.user.ChangePasswordDto;
import com.krisztavasas.db_library.dto.user.CreateUserDto;
import com.krisztavasas.db_library.dto.user.UpdateUserDto;
import com.krisztavasas.db_library.dto.user.UserDto;
import com.krisztavasas.db_library.dto.user.UserSearchFilterDto;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.enums.UserRole;
import com.krisztavasas.db_library.mapper.UserMapper;
import com.krisztavasas.db_library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserFacade {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserDto findByEmail(String email) {
        User user = userService.findByEmail(email);
        return userMapper.toDto(user);
    }

    public UserDto findById(UUID id) {
        User user = userService.findById(id);
        return userMapper.toDto(user);
    }

    public Page<UserDto> findAll(Pageable pageable) {
        return userService.findAll(pageable)
                .map(userMapper::toDto);
    }

    public Page<UserDto> searchWithFilters(UserSearchFilterDto filter, Pageable pageable) {
        return userService.searchWithFilters(filter, pageable)
                .map(userMapper::toDto);
    }

    @Transactional
    public UserDto createUser(CreateUserDto dto) {
        User user = userService.createUser(dto);
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDto updateProfile(String email, UpdateUserDto dto) {
        User user = userService.updateProfile(email, dto);
        return userMapper.toDto(user);
    }

    @Transactional
    public void changePassword(String email, ChangePasswordDto dto) {
        userService.changePassword(email, dto);
    }

    @Transactional
    public void deleteAccount(String email) {
        userService.deleteAccount(email);
    }

    @Transactional
    public UserDto updateRole(UUID id, UserRole role) {
        User user = userService.updateRole(id, role);
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDto updateLoyaltyStatus(UUID id, Boolean isLoyaltyMember, BigDecimal discountPercent) {
        User user = userService.updateLoyaltyStatus(id, isLoyaltyMember, discountPercent);
        return userMapper.toDto(user);
    }
}
