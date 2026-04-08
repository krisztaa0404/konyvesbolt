package com.krisztavasas.db_library.dto.user;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public record PreferencesDto(
    Boolean newsletter,
    List<String> favoriteGenres,
    Boolean notificationEmail
) implements Serializable {

    public PreferencesDto {
        if (newsletter == null) {
            newsletter = false;
        }
        if (favoriteGenres == null) {
            favoriteGenres = new ArrayList<>();
        }
        if (notificationEmail == null) {
            notificationEmail = false;
        }
    }
}
