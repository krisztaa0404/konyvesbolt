package com.krisztavasas.db_library.dto.book;

import com.krisztavasas.db_library.dto.genre.GenreDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record BookDto(
        UUID id,
        String title,
        String[] authors,
        BigDecimal price,
        Integer stockQuantity,
        Integer salesCount,
        String coverImageUrl,
        List<GenreDto> genres,
        String isbn,
        boolean deleted
) {
}
