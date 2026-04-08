package com.krisztavasas.db_library.dto.manager;

import java.math.BigDecimal;

public record DashboardMetricsDto(
        Long ordersToday,
        BigDecimal revenueToday,
        Long ordersWeek,
        BigDecimal revenueWeek,
        Long ordersMonth,
        BigDecimal revenueMonth,
        Long pendingOrders,
        Long lowStockBooks
) {
}
