package com.krisztavasas.db_library.dto.common;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record AddressDto(
    @NotBlank(message = "Street is required")
    @Size(max = 200, message = "Street must not exceed 200 characters")
    String street,

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City must not exceed 100 characters")
    String city,

    @Size(max = 50, message = "State must not exceed 50 characters")
    String state,

    @NotBlank(message = "Postal code is required")
    @Size(max = 20, message = "Postal code must not exceed 20 characters")
    String postalCode,

    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country must not exceed 100 characters")
    String country,

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    String phone,

    @Size(max = 20, message = "Type must not exceed 20 characters")
    String type,

    Boolean isDefault
) implements Serializable {}
