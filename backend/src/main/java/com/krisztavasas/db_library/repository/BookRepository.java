package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.repository.projection.TopBookProjection;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        SELECT b.* FROM mv_book_recommendations mr
        JOIN books b ON mr.recommended_book_id = b.id
        WHERE mr.book_id = :bookId
        ORDER BY mr.co_purchase_count DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Book> findRecommendations(@Param("bookId") UUID bookId, @Param("limit") int limit);

    @Query("SELECT DISTINCT b FROM Book b JOIN b.genres g WHERE g = :genre AND b.deletedAt IS NULL")
    List<Book> findByGenresContaining(@Param("genre") com.krisztavasas.db_library.entity.Genre genre);
}
