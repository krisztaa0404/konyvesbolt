package com.krisztavasas.db_library.valueobject;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UserAddress(
    @NotBlank String street,
    @NotBlank String city,
    String state,
    @NotBlank String postalCode,
    @NotBlank String country,
    String type,
    Boolean isDefault
) implements Serializable {}
