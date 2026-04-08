package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.SeasonalDiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface SeasonalDiscountRepository extends JpaRepository<SeasonalDiscount, UUID>,
        JpaSpecificationExecutor<SeasonalDiscount> {

    @Query("""
        SELECT DISTINCT sd FROM SeasonalDiscount sd
        LEFT JOIN FETCH sd.applicableBooks
        WHERE sd.isActive = true
        AND sd.validFrom <= :now
        AND sd.validTo >= :now
        AND sd.minimumOrderAmount <= :orderTotal
        AND (sd.maxUsageCount IS NULL OR sd.currentUsageCount < sd.maxUsageCount)
        AND (
            sd.scopeType = 'ALL_BOOKS'
            OR EXISTS (
                SELECT 1 FROM sd.applicableBooks b
                WHERE b.id IN :bookIds
            )
        )
        """)
    List<SeasonalDiscount> findApplicableDiscounts(
            @Param("bookIds") Set<UUID> bookIds,
            @Param("orderTotal") BigDecimal orderTotal,
            @Param("now") LocalDateTime now
    );

    @Query("""
        SELECT sd FROM SeasonalDiscount sd
        WHERE sd.isActive = true
        AND sd.validFrom <= :now
        AND sd.validTo >= :now
        ORDER BY sd.percentage DESC
        """)
    List<SeasonalDiscount> findCurrentlyActive(@Param("now") LocalDateTime now);
}
