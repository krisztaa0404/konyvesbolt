package com.krisztavasas.db_library.dto.wishlist;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record WishlistDetailDto(
    UUID id,
    UUID userId,
    List<WishlistItemDto> items,
    Integer itemCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
