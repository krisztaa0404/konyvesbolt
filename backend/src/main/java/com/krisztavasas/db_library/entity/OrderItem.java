package com.krisztavasas.db_library.entity;

import com.krisztavasas.db_library.enums.BookFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Rendelési tétel entitás.
 * <p>
 * Reprezentálja egy rendelés egyes tételeit (könyveket).
 * Tartalmazza a konkrét formátumot (fizikai, e-könyv, hangoskönyv), mennyiséget, és árakat.
 * Many-to-One kapcsolatban áll a rendelésekkel és a könyvekkel.
 * Hibernate Envers segítségével minden változás naplózásra kerül az order_items_aud táblába.
 */
@Entity
@Table(name = "order_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Audited
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Book book;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookFormat format;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private BigDecimal subtotal;
}
