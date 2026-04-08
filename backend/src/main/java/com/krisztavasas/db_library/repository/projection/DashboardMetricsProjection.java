package com.krisztavasas.db_library.repository.projection;

import java.math.BigDecimal;

public interface DashboardMetricsProjection {
    Long getOrdersToday();
    BigDecimal getRevenueToday();
    Long getOrdersWeek();
    BigDecimal getRevenueWeek();
    Long getOrdersMonth();
    BigDecimal getRevenueMonth();
    Long getPendingOrders();
}
