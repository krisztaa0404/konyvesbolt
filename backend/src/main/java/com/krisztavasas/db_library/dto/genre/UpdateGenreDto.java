package com.krisztavasas.db_library.dto.genre;

import jakarta.validation.constraints.Size;

public record UpdateGenreDto(
        @Size(max = 100, message = "Genre name must not exceed 100 characters")
        String name,

        @Size(max = 500, message = "Description must not exceed 500 characters")
        String description
) {
}
