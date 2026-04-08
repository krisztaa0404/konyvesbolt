package com.krisztavasas.db_library.dto.genre;

import java.util.UUID;

public record GenreDto(
        UUID id,
        String name,
        String description
) {
}
