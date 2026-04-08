package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.repository.projection.GenreStatisticsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GenreRepository extends JpaRepository<Genre, UUID>, JpaSpecificationExecutor<Genre> {
    Optional<Genre> findByExternalId(Long externalId);
    Optional<Genre> findByName(String name);

    @Query(value = "SELECT * FROM mv_genre_statistics ORDER BY total_sales DESC, book_count DESC LIMIT 10", nativeQuery = true)
    List<GenreStatisticsProjection> findGenreStatistics();
}
