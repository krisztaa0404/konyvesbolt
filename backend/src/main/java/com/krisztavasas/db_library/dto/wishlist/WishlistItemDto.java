package com.krisztavasas.db_library.dto.wishlist;

import com.krisztavasas.db_library.dto.book.BookDto;

import java.time.LocalDateTime;
import java.util.UUID;

public record WishlistItemDto(
    UUID id,
    UUID bookId,
    BookDto book,
    LocalDateTime createdAt
) {}
