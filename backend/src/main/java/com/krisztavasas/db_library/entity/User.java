package com.krisztavasas.db_library.entity;

import com.krisztavasas.db_library.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.krisztavasas.db_library.valueobject.UserAddress;
import com.krisztavasas.db_library.valueobject.UserPreferences;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Felhasználó entitás.
 * <p>
 * Reprezentálja a könyvesbolt regisztrált felhasználóit.
 * Soft delete támogatással rendelkezik - törlés esetén csak a deleted_at mező kerül kitöltésre.
 * Támogatja a hűségprogramot és az összes vásárlási érték nyilvántartását.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "external_id", unique = true, nullable = true, updatable = false)
    private Long externalId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private String phone;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    @Builder.Default
    @Column(name = "is_loyalty_member")
    private Boolean isLoyaltyMember = false;

    @Builder.Default
    @Column(name = "loyalty_discount_percent")
    private BigDecimal loyaltyDiscountPercent = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "total_spent")
    private BigDecimal totalSpent = BigDecimal.ZERO;

    @CreatedDate
    @Column(name = "registration_date", updatable = false)
    private LocalDateTime registrationDate;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", name = "address_data")
    private List<UserAddress> addressData;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private UserPreferences preferences;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "refresh_token", length = 64)
    private String refreshToken;

    @Column(name = "refresh_token_expires_at")
    private LocalDateTime refreshTokenExpiresAt;
}
