package com.krisztavasas.db_library.valueobject;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.io.Serializable;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record BookMetadata(
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
