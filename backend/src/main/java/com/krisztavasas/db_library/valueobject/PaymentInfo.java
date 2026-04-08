package com.krisztavasas.db_library.valueobject;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.time.LocalDateTime;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record PaymentInfo(
    @NotBlank String method,
    String status,
    String transactionId,
    LocalDateTime paidAt
) implements Serializable {}
