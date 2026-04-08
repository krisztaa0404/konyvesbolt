package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.genre.CreateGenreDto;
import com.krisztavasas.db_library.dto.genre.GenreFilterDto;
import com.krisztavasas.db_library.dto.genre.UpdateGenreDto;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.GenreRepository;
import com.krisztavasas.db_library.repository.GenreSpecification;
import com.krisztavasas.db_library.repository.projection.GenreStatisticsProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {

    private final GenreRepository genreRepository;

    public Page<Genre> findAll(GenreFilterDto filter, Pageable pageable) {
        Specification<Genre> spec = GenreSpecification.withFilters(filter.name());
        return genreRepository.findAll(spec, pageable);
    }

    public Genre findById(UUID id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Genre not found with id: " + id));
    }

    public List<GenreStatisticsProjection> getStatistics() {
        return genreRepository.findGenreStatistics();
    }

    @Transactional
    public Genre create(CreateGenreDto dto) {
        Genre genre = new Genre();
        genre.setName(dto.name());
        genre.setDescription(dto.description());
        return genreRepository.save(genre);
    }

    @Transactional
    public Genre update(UUID id, UpdateGenreDto dto) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Genre not found with id: " + id));

        if (dto.name() != null) genre.setName(dto.name());
        if (dto.description() != null) genre.setDescription(dto.description());

        return genreRepository.save(genre);
    }

    @Transactional
    public void delete(UUID id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Genre not found with id: " + id));
        genreRepository.delete(genre);
    }

    public List<Genre> findByIds(List<UUID> ids) {
        List<Genre> genres = genreRepository.findAllById(ids);
        if (genres.size() != ids.size()) {
            throw new EntityNotFoundException("Some genres not found");
        }
        return genres;
    }
}
