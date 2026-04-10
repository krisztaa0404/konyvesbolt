package com.krisztavasas.db_library.dto.discount;

import java.util.UUID;

public record NamedEntityRefDto(
    UUID id,
    String name
) {
}
