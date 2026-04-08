package com.krisztavasas.db_library.dto.book;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

public record UpdateBookDto(
        @Size(max = 500, message = "Title must not exceed 500 characters")
        String title,

        String[] authors,

        @Size(max = 20, message = "ISBN must not exceed 20 characters")
        String isbn,

        @Size(max = 200, message = "Publisher must not exceed 200 characters")
        String publisher,

        @Min(value = 1000, message = "Publication year must be valid")
        Integer publicationYear,

        @Min(value = 1, message = "Page count must be at least 1")
        Integer pageCount,

        @Min(value = 0, message = "Price must be positive")
        BigDecimal price,

        @Min(value = 0, message = "Stock quantity cannot be negative")
        Integer stockQuantity,

        String description,

        String[] tags,

        String[] availableFormats,

        Set<UUID> genreIds,

        @Valid
        BookMetadataDto metadata
) {
}
