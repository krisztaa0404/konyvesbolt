package com.krisztavasas.db_library.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.krisztavasas.db_library.valueobject.BookMetadata;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Könyv entitás.
 * <p>
 * Reprezentálja a könyvesbolt könyveit.
 * Támogatja a PostgreSQL speciális típusait: array (szerzők, címkék, elérhető formátumok) és JSONB (metaadatok).
 * JPA Auditing segítségével automatikusan követi a létrehozás és módosítás időpontját.
 * Many-to-Many kapcsolatban áll a műfajokkal.
 */
@Entity
@Table(name = "books")
@SQLRestriction("deleted_at IS NULL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "external_id", unique = true, nullable = true, updatable = false)
    private Long externalId;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 20, unique = true)
    private String isbn;

    @Column(nullable = false)
    private String publisher;

    @Column(name = "publication_year")
    private Integer publicationYear;

    private Integer pages;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Builder.Default
    @Column(name = "sales_count", nullable = false)
    private Integer salesCount = 0;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private String[] authors;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private String[] tags;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "available_formats", columnDefinition = "text[]", nullable = false)
    private String[] availableFormats;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private BookMetadata metadata;

    @Builder.Default
    @ManyToMany
    @JoinTable(
        name = "book_genres",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();
}
