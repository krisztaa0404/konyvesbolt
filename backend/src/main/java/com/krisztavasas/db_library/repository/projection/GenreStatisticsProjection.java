package com.krisztavasas.db_library.repository.projection;

import java.math.BigDecimal;
import java.util.UUID;

public interface GenreStatisticsProjection {
    UUID getGenreId();
    String getGenreName();
    String getDescription();
    Long getBookCount();
    BigDecimal getAvgPrice();
    Long getTotalSales();
}
