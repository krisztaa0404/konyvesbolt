package com.krisztavasas.db_library.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;

import java.io.Serializable;
import java.time.LocalDateTime;

public record PaymentInfoDto(
    @NotBlank(message = "Payment method is required")
    String method,

    String status,

    String transactionId,

    @PastOrPresent(message = "Payment date must be in the past or present")
    LocalDateTime paidAt
) implements Serializable {}
