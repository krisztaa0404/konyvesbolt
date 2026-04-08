package com.krisztavasas.db_library.valueobject;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.io.Serializable;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UserPreferences(
    Boolean newsletter,
    List<String> favoriteGenres,
    Boolean notificationEmail
) implements Serializable {

    public UserPreferences {
        if (newsletter == null) newsletter = false;
        if (favoriteGenres == null) favoriteGenres = List.of();
        if (notificationEmail == null) notificationEmail = false;
    }
}
