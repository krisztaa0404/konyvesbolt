package com.krisztavasas.db_library.dto.wishlist;

import java.time.LocalDateTime;
import java.util.UUID;

public record WishlistDto(
    UUID id,
    UUID userId,
    Integer itemCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
