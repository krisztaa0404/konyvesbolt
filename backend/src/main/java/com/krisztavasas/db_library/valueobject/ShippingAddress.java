package com.krisztavasas.db_library.valueobject;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ShippingAddress(
    @NotBlank String street,
    @NotBlank String city,
    @NotBlank String postalCode,
    @NotBlank String country,
    String phone
) implements Serializable {}
