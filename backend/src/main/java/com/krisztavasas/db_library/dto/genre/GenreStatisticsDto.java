package com.krisztavasas.db_library.dto.genre;

import java.math.BigDecimal;
import java.util.UUID;

public record GenreStatisticsDto(
        UUID genreId,
        String genreName,
        String description,
        Long bookCount,
        BigDecimal avgPrice,
        Long totalSales
) {
}
