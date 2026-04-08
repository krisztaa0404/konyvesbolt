package com.krisztavasas.db_library.dto.book;

import java.io.Serializable;

public record BookMetadataDto(
    String genre,
    Double rating,
    Integer numRatings,
    String readingAge,
    String dimensions,
    String language,
    String coverImageUrl,
    String bestsellerRanks,
    String categoryHierarchy,
    String seriesName,
    Integer seriesPosition
) implements Serializable {}
