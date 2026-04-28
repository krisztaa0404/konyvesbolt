package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {

    @Query(value = "SELECT id, book_id FROM order_items WHERE id IN :itemIds",
           nativeQuery = true)
    List<Object[]> findItemIdAndBookIdByIds(@Param("itemIds") List<UUID> itemIds);
}
