package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.genre.CreateGenreDto;
import com.krisztavasas.db_library.dto.genre.GenreDto;
import com.krisztavasas.db_library.dto.genre.GenreFilterDto;
import com.krisztavasas.db_library.dto.genre.GenreStatisticsDto;
import com.krisztavasas.db_library.dto.genre.UpdateGenreDto;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.mapper.GenreMapper;
import com.krisztavasas.db_library.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreFacade {

    private final GenreService genreService;
    private final GenreMapper genreMapper;

    public Page<GenreDto> findAll(GenreFilterDto filter, Pageable pageable) {
        return genreService.findAll(filter, pageable)
                .map(genreMapper::toDto);
    }

    public GenreDto findById(UUID id) {
        Genre genre = genreService.findById(id);
        return genreMapper.toDto(genre);
    }

    public List<GenreStatisticsDto> getStatistics() {
        return genreService.getStatistics().stream()
                .map(genreMapper::toStatisticsDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public GenreDto create(CreateGenreDto dto) {
        Genre genre = genreService.create(dto);
        return genreMapper.toDto(genre);
    }

    @Transactional
    public GenreDto update(UUID id, UpdateGenreDto dto) {
        Genre genre = genreService.update(id, dto);
        return genreMapper.toDto(genre);
    }

    @Transactional
    public void delete(UUID id) {
        genreService.delete(id);
    }
}
