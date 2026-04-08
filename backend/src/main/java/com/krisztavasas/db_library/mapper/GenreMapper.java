package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.genre.CreateGenreDto;
import com.krisztavasas.db_library.dto.genre.GenreDto;
import com.krisztavasas.db_library.dto.genre.GenreStatisticsDto;
import com.krisztavasas.db_library.dto.genre.UpdateGenreDto;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.repository.projection.GenreStatisticsProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface GenreMapper {

    GenreDto toDto(Genre genre);

    GenreStatisticsDto toStatisticsDto(GenreStatisticsProjection projection);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", ignore = true)
    @Mapping(target = "books", ignore = true)
    Genre toEntity(CreateGenreDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", ignore = true)
    @Mapping(target = "books", ignore = true)
    void updateEntity(UpdateGenreDto dto, @MappingTarget Genre genre);
}
