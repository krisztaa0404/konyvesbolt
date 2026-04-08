package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.user.*;
import com.krisztavasas.db_library.facade.UserFacade;
import com.krisztavasas.db_library.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserFacade userFacade;

    @GetMapping("/me")
    public UserDto getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userFacade.findByEmail(email);
    }

    @PutMapping("/me")
    public UserDto updateProfile(@Valid @RequestBody UpdateUserDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        return userFacade.updateProfile(email, dto);
    }

    @PostMapping("/me/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@Valid @RequestBody ChangePasswordDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        userFacade.changePassword(email, dto);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAccount() {
        String email = SecurityUtils.getCurrentUserEmail();
        userFacade.deleteAccount(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto createUser(@Valid @RequestBody CreateUserDto dto) {
        return userFacade.createUser(dto);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public Page<UserDto> getAllUsers(
            @ModelAttribute UserSearchFilterDto filter,
            @PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if (filter.hasAnyFilter()) {
            return userFacade.searchWithFilters(filter, pageable);
        }
        return userFacade.findAll(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public UserDto getUser(@PathVariable UUID id) {
        return userFacade.findById(id);
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto updateUserRole(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserRoleDto dto
    ) {
        return userFacade.updateRole(id, dto.role());
    }

    @PutMapping("/{id}/loyalty")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public UserDto updateLoyaltyStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateLoyaltyDto dto
    ) {
        return userFacade.updateLoyaltyStatus(id, dto.isLoyaltyMember(), dto.discountPercent());
    }
}
