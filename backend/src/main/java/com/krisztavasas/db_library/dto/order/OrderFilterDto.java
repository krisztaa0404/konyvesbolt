package com.krisztavasas.db_library.dto.order;

import com.krisztavasas.db_library.enums.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderFilterDto(
        String search,
        List<OrderStatus> statuses,
        UUID userId,
        LocalDateTime dateFrom,
        LocalDateTime dateTo
) {
    public boolean hasAnyFilter() {
        return search != null ||
               (statuses != null && !statuses.isEmpty()) ||
               userId != null ||
               dateFrom != null ||
               dateTo != null;
    }
}
