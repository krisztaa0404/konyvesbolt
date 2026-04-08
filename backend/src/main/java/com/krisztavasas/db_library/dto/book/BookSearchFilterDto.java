package com.krisztavasas.db_library.dto.book;

import com.krisztavasas.db_library.enums.StockStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record BookSearchFilterDto(
        String search,
        String title,
        List<UUID> genreIds,
        String author,
        String tag,
        String format,
        BigDecimal priceMin,
        BigDecimal priceMax,
        Integer yearFrom,
        Integer yearTo,
        Boolean inStock,
        UUID discountId,
        StockStatus stockStatus
) {
    public boolean hasAnyFilter() {
        return search != null || title != null || genreIds != null || author != null ||
                tag != null || format != null || priceMin != null ||
                priceMax != null || yearFrom != null || yearTo != null || inStock != null ||
                discountId != null || stockStatus != null;
    }
}
