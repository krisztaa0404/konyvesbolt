package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.repository.projection.TopBookProjection;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID>, JpaSpecificationExecutor<Book> {
    Optional<Book> findByExternalId(Long externalId);
    Optional<Book> findByIsbn(String isbn);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Book b WHERE b.id = :id")
    Optional<Book> findByIdForUpdate(@Param("id") UUID id);

    @Query("SELECT b FROM Book b WHERE b.id = :id")
    Optional<Book> findByIdIncludingDeleted(@Param("id") UUID id);

    @Query("SELECT b FROM Book b WHERE b.id IN :ids")
    List<Book> findByIdsIncludingDeleted(@Param("ids") List<UUID> ids);

    @Query(value = """
        SELECT * FROM books
        WHERE to_tsvector('simple', title) @@ plainto_tsquery('simple', :searchQuery)
        ORDER BY ts_rank(to_tsvector('simple', title),
                         plainto_tsquery('simple', :searchQuery)) DESC
        """, nativeQuery = true)
    Page<Book> fullTextSearchByTitle(@Param("searchQuery") String searchQuery, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.stockQuantity < :threshold ORDER BY b.stockQuantity ASC")
    List<Book> findLowStock(@Param("threshold") int threshold);

    @Query("SELECT COUNT(b) FROM Book b WHERE b.stockQuantity < :threshold AND b.deletedAt IS NULL")
    long countLowStock(@Param("threshold") int threshold);

    @Modifying
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity + :quantityChange, " +
           "b.salesCount = b.salesCount + :salesChange WHERE b.id = :id")
    void updateStockBatch(@Param("id") UUID id,
                          @Param("quantityChange") int quantityChange,
                          @Param("salesChange") int salesChange);

    @Query("SELECT b FROM Book b ORDER BY b.createdAt DESC")
    Page<Book> findNewest(Pageable pageable);

    @Query(value = "SELECT * FROM mv_top_books_weekly ORDER BY units_sold DESC LIMIT :limit", nativeQuery = true)
    List<TopBookProjection> findTopWeekly(@Param("limit") int limit);

    @Query(value = "SELECT * FROM mv_top_books_monthly ORDER BY units_sold DESC LIMIT :limit", nativeQuery = true)
    List<TopBookProjection> findTopMonthly(@Param("limit") int limit);

    @Query(value = """
        WITH co_purchase_recommendations AS (
            SELECT DISTINCT b.id, b.title, b.authors, b.isbn, b.publisher, b.publication_year,
                   b.pages, b.price, b.stock_quantity, b.sales_count, b.description,
                   b.tags, b.available_formats, b.metadata, b.created_at, b.updated_at, b.deleted_at,
                   b.external_id, mr.co_purchase_count as relevance_score
            FROM mv_book_recommendations mr
            INNER JOIN books b ON mr.recommended_book_id = b.id
            WHERE mr.book_id = :bookId
              AND b.deleted_at IS NULL
            ORDER BY mr.co_purchase_count DESC
            LIMIT :limit
        ),
        genre_based_recommendations AS (
            SELECT DISTINCT b.id, b.title, b.authors, b.isbn, b.publisher, b.publication_year,
                   b.pages, b.price, b.stock_quantity, b.sales_count, b.description,
                   b.tags, b.available_formats, b.metadata, b.created_at, b.updated_at, b.deleted_at,
                   b.external_id, b.sales_count as relevance_score
            FROM books b
            INNER JOIN book_genres bg ON b.id = bg.book_id
            WHERE bg.genre_id IN (
                SELECT bg2.genre_id
                FROM book_genres bg2
                WHERE bg2.book_id = :bookId
            )
            AND b.id != :bookId
            AND b.deleted_at IS NULL
            ORDER BY b.sales_count DESC
            LIMIT :limit
        )
        SELECT * FROM (
            SELECT * FROM co_purchase_recommendations
            UNION ALL
            SELECT * FROM genre_based_recommendations
            WHERE (SELECT COUNT(*) FROM co_purchase_recommendations) = 0
        ) combined
        ORDER BY relevance_score DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Book> findRecommendations(@Param("bookId") UUID bookId, @Param("limit") int limit);

    @Query("SELECT DISTINCT b FROM Book b JOIN b.genres g WHERE g = :genre AND b.deletedAt IS NULL")
    List<Book> findByGenresContaining(@Param("genre") com.krisztavasas.db_library.entity.Genre genre);

    @Query(value = """
        SELECT DISTINCT b.* FROM books b
        INNER JOIN book_genres bg ON b.id = bg.book_id
        WHERE bg.genre_id = :genreId
          AND b.deleted_at IS NULL
        ORDER BY b.sales_count DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Book> findTopBooksByGenre(@Param("genreId") UUID genreId, @Param("limit") int limit);

    @Query(value = """
        SELECT DISTINCT b.* FROM books b
        INNER JOIN book_genres bg ON b.id = bg.book_id
        WHERE bg.genre_id IN :genreIds
          AND b.id != :excludeBookId
          AND b.deleted_at IS NULL
        ORDER BY b.sales_count DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Book> findByGenresOrderBySales(@Param("genreIds") List<UUID> genreIds,
                                         @Param("excludeBookId") UUID excludeBookId,
                                         @Param("limit") int limit);

    @EntityGraph(attributePaths = {"genres"})
    @Query("SELECT b FROM Book b WHERE b.id IN :ids")
    List<Book> findByIdsWithGenres(@Param("ids") List<UUID> ids);
}
