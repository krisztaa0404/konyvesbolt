package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.book.BookDto;
import com.krisztavasas.db_library.dto.genre.CreateGenreDto;
import com.krisztavasas.db_library.dto.genre.GenreDto;
import com.krisztavasas.db_library.dto.genre.GenreFilterDto;
import com.krisztavasas.db_library.dto.genre.GenreStatisticsDto;
import com.krisztavasas.db_library.dto.genre.UpdateGenreDto;
import com.krisztavasas.db_library.facade.GenreFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreFacade genreFacade;

    @GetMapping
    public Page<GenreDto> getAllGenres(
            @ModelAttribute GenreFilterDto filter,
            @PageableDefault(size = 200) Pageable pageable
    ) {
        return genreFacade.findAll(filter, pageable);
    }

    @GetMapping("/{id}")
    public GenreDto getGenre(@PathVariable UUID id) {
        return genreFacade.findById(id);
    }

    @GetMapping("/statistics")
    public List<GenreStatisticsDto> getStatistics() {
        return genreFacade.getStatistics();
    }

    @GetMapping("/{id}/top-books")
    public List<BookDto> getTopBooks(
            @PathVariable("id") UUID genreId,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return genreFacade.findTopBooks(genreId, limit);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public GenreDto createGenre(@Valid @RequestBody CreateGenreDto dto) {
        return genreFacade.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public GenreDto updateGenre(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateGenreDto dto
    ) {
        return genreFacade.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public void deleteGenre(@PathVariable UUID id) {
        genreFacade.delete(id);
    }
}
