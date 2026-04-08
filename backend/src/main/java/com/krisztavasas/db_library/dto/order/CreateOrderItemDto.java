package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.enums.BookFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateOrderItemDto(
        @NotNull(message = "Book ID is required")
        UUID bookId,

        @NotNull(message = "Format is required")
        BookFormat format,

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        Integer quantity
) {
}
