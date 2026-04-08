package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.config.StockConfig;
import com.krisztavasas.db_library.dto.manager.DashboardMetricsDto;
import com.krisztavasas.db_library.enums.OrderStatus;
import com.krisztavasas.db_library.repository.projection.DashboardMetricsProjection;
import com.krisztavasas.db_library.service.BookService;
import com.krisztavasas.db_library.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardFacade {

    private final OrderService orderService;
    private final BookService bookService;
    private final StockConfig stockConfig;

    public DashboardMetricsDto getMetrics() {
        LocalDateTime startOfToday = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
        LocalDateTime startOfMonth = LocalDateTime.now().minusDays(30);

        DashboardMetricsProjection metrics = orderService.getDashboardMetrics(
                startOfToday,
                startOfWeek,
                startOfMonth,
                OrderStatus.PENDING.name()
        );

        long lowStockBooks = bookService.countLowStock(stockConfig.getLowThreshold());

        return new DashboardMetricsDto(
                metrics.getOrdersToday(),
                metrics.getRevenueToday(),
                metrics.getOrdersWeek(),
                metrics.getRevenueWeek(),
                metrics.getOrdersMonth(),
                metrics.getRevenueMonth(),
                metrics.getPendingOrders(),
                lowStockBooks
        );
    }
}
