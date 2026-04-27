package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, UUID>,
                                             JpaSpecificationExecutor<Wishlist> {

    @Query("SELECT w FROM Wishlist w WHERE w.user.id = :userId")
    Optional<Wishlist> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT w FROM Wishlist w LEFT JOIN FETCH w.items wi LEFT JOIN FETCH wi.book " +
           "WHERE w.id = :id")
    Optional<Wishlist> findByIdWithItems(@Param("id") UUID id);

    @Query("SELECT w FROM Wishlist w LEFT JOIN FETCH w.items wi LEFT JOIN FETCH wi.book " +
           "WHERE w.user.id = :userId")
    Optional<Wishlist> findByUserIdWithItems(@Param("userId") UUID userId);
}
