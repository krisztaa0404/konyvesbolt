package com.krisztavasas.db_library.repository.projection;

import java.math.BigDecimal;
import java.util.UUID;

public interface TopBookProjection {
    UUID getId();
    String getTitle();
    String[] getAuthors();
    BigDecimal getPrice();
    String getIsbn();
    String getCoverImageUrl();
    Integer getStockQuantity();
    Integer getSalesCount();
    Long getOrderCount();
    Long getUnitsSold();
    BigDecimal getTotalRevenue();
}
