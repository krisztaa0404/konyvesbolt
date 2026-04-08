package com.krisztavasas.db_library.dto.book;

import com.krisztavasas.db_library.dto.genre.GenreDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record BookDetailDto(
        UUID id,
        String title,
        String[] authors,
        String isbn,
        String publisher,
        Integer publicationYear,
        Integer pageCount,
        BigDecimal price,
        Integer stockQuantity,
        Integer salesCount,
        String description,
        String[] tags,
        String[] availableFormats,
        List<GenreDto> genres,
        BookMetadataDto metadata,
        String coverImageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
