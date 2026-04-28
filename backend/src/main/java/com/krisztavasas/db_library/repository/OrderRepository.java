package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Order;
import com.krisztavasas.db_library.repository.projection.DashboardMetricsProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID>, JpaSpecificationExecutor<Order> {
    Optional<Order> findByExternalId(Long externalId);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.orderDate DESC")
    Page<Order> findByUserId(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items i LEFT JOIN FETCH i.book WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") UUID id);

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END " +
           "FROM Order o JOIN o.items oi " +
           "WHERE oi.book.id = :bookId AND o.status IN :activeStatuses")
    boolean existsInActiveOrders(
            @Param("bookId") UUID bookId,
            @Param("activeStatuses") List<com.krisztavasas.db_library.enums.OrderStatus> activeStatuses
    );

    @Query(value = """
            SELECT
                COUNT(CASE WHEN order_date >= :startOfToday THEN 1 END) AS ordersToday,
                COALESCE(SUM(CASE WHEN order_date >= :startOfToday THEN total_amount END), 0) AS revenueToday,
                COUNT(CASE WHEN order_date >= :startOfWeek THEN 1 END) AS ordersWeek,
                COALESCE(SUM(CASE WHEN order_date >= :startOfWeek THEN total_amount END), 0) AS revenueWeek,
                COUNT(CASE WHEN order_date >= :startOfMonth THEN 1 END) AS ordersMonth,
                COALESCE(SUM(CASE WHEN order_date >= :startOfMonth THEN total_amount END), 0) AS revenueMonth,
                COUNT(CASE WHEN status = :pendingStatus THEN 1 END) AS pendingOrders
            FROM orders
            """, nativeQuery = true)
    DashboardMetricsProjection getDashboardMetrics(
            @Param("startOfToday") LocalDateTime startOfToday,
            @Param("startOfWeek") LocalDateTime startOfWeek,
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("pendingStatus") String pendingStatus
    );
}
