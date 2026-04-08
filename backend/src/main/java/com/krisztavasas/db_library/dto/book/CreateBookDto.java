package com.krisztavasas.db_library.dto.book;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

public record CreateBookDto(
        @NotBlank(message = "Title is required")
        @Size(max = 500, message = "Title must not exceed 500 characters")
        String title,

        @NotNull(message = "Authors are required")
        @Size(min = 1, message = "At least one author is required")
        String[] authors,

        @NotBlank(message = "ISBN is required")
        @Size(max = 20, message = "ISBN must not exceed 20 characters")
        String isbn,

        @NotBlank(message = "Publisher is required")
        @Size(max = 200, message = "Publisher must not exceed 200 characters")
        String publisher,

        @NotNull(message = "Publication year is required")
        @Min(value = 1000, message = "Publication year must be valid")
        Integer publicationYear,

        @Min(value = 1, message = "Page count must be at least 1")
        Integer pageCount,

        @NotNull(message = "Price is required")
        @Min(value = 0, message = "Price must be positive")
        BigDecimal price,

        @NotNull(message = "Stock quantity is required")
        @Min(value = 0, message = "Stock quantity cannot be negative")
        Integer stockQuantity,

        String description,

        String[] tags,

        @NotNull(message = "At least one format is required")
        @Size(min = 1, message = "At least one format is required")
        String[] availableFormats,

        Set<UUID> genreIds,

        @Valid
        BookMetadataDto metadata
) {
}
