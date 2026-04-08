package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.book.BookDetailDto;
import com.krisztavasas.db_library.dto.book.BookDto;
import com.krisztavasas.db_library.dto.book.BookSearchFilterDto;
import com.krisztavasas.db_library.dto.book.CreateBookDto;
import com.krisztavasas.db_library.dto.book.UpdateBookDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.mapper.BookMapper;
import com.krisztavasas.db_library.service.BookService;
import com.krisztavasas.db_library.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookFacade {

    private final BookService bookService;
    private final GenreService genreService;
    private final BookMapper bookMapper;

    public Page<BookDto> findAll(Pageable pageable) {
        return bookService.findAll(pageable)
                .map(bookMapper::toDto);
    }

    public Page<BookDto> searchWithFilters(BookSearchFilterDto filter, Pageable pageable) {
        return bookService.searchWithFilters(filter, pageable)
                .map(bookMapper::toDto);
    }

    public Page<BookDto> fullTextSearch(String query, Pageable pageable) {
        return bookService.fullTextSearch(query, pageable)
                .map(bookMapper::toDto);
    }

    public BookDetailDto findById(UUID id) {
        Book book = bookService.findById(id);
        return bookMapper.toDetailDto(book);
    }

    public Page<BookDto> findNewest(Pageable pageable) {
        return bookService.findNewest(pageable)
                .map(bookMapper::toDto);
    }

    public List<BookDto> findLowStock(int threshold) {
        return bookService.findLowStock(threshold).stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<BookDto> findTopWeekly(int limit) {
        return bookService.findTopWeekly(limit).stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<BookDto> findTopMonthly(int limit) {
        return bookService.findTopMonthly(limit).stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<BookDto> findRecommendations(UUID bookId, int limit) {
        return bookService.findRecommendations(bookId, limit).stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookDetailDto create(CreateBookDto dto) {
        Book book = bookMapper.toEntity(dto);

        // Handle genre relationships
        if (dto.genreIds() != null && !dto.genreIds().isEmpty()) {
            Set<Genre> genres = new HashSet<>(genreService.findByIds(new ArrayList<>(dto.genreIds())));
            book.setGenres(genres);
        }

        Book saved = bookService.create(book);
        return bookMapper.toDetailDto(saved);
    }

    @Transactional
    public BookDetailDto update(UUID id, UpdateBookDto dto) {
        Book book = bookService.findById(id);
        bookMapper.updateEntity(dto, book);

        if (dto.genreIds() != null) {
            Set<Genre> genres = new HashSet<>(genreService.findByIds(new ArrayList<>(dto.genreIds())));
            book.setGenres(genres);
        }

        Book saved = bookService.update(book);
        return bookMapper.toDetailDto(saved);
    }

    @Transactional
    public void delete(UUID id) {
        bookService.delete(id);
    }
}
