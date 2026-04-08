package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.dto.book.BookDto;
import com.krisztavasas.db_library.enums.BookFormat;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemDto(
        UUID id,
        BookDto book,
        BookFormat format,
        Integer quantity,
        BigDecimal priceAtOrder,
        BigDecimal subtotal
) {
}
