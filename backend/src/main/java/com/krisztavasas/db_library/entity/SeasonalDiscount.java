package com.krisztavasas.db_library.entity;

import com.krisztavasas.db_library.enums.DiscountScopeType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Szezonális kedvezmény entitás.
 * <p>
 * Reprezentálja a promóciós kedvezményeket, amelyeket adminisztrátorok és menedzserek hozhatnak létre.
 * Támogatja a rugalmas hatókört: specifikus könyvek, műfajok szerint kibővített könyvek, vagy az összes könyv.
 * Tartalmazza a felhasználási korlátokat és az érvényességi időszakot.
 * Many-to-Many kapcsolatban áll a könyvekkel, a kedvezményre érvényes könyvek meghatározásához.
 */
@Entity
@Table(name = "seasonal_discounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class SeasonalDiscount {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal percentage;

    @Column(name = "valid_from", nullable = false)
    private LocalDateTime validFrom;

    @Column(name = "valid_to", nullable = false)
    private LocalDateTime validTo;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "scope_type", nullable = false, length = 20)
    private DiscountScopeType scopeType;

    /**
     * Maximális felhasználások száma. Ha NULL, akkor korlátlan.
     */
    @Column(name = "max_usage_count")
    private Integer maxUsageCount;

    @Builder.Default
    @Column(name = "current_usage_count", nullable = false)
    private Integer currentUsageCount = 0;

    @Builder.Default
    @Column(name = "minimum_order_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal minimumOrderAmount = BigDecimal.ZERO;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Builder.Default
    @ManyToMany
    @JoinTable(
        name = "discount_books",
        joinColumns = @JoinColumn(name = "discount_id"),
        inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> applicableBooks = new HashSet<>();
}
