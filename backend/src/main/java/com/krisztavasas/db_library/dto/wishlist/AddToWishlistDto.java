package com.krisztavasas.db_library.dto.wishlist;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddToWishlistDto(
    @NotNull(message = "Book ID is required")
    UUID bookId
) {}
