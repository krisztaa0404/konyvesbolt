package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.config.StockConfig;
import com.krisztavasas.db_library.dto.book.BookDetailDto;
import com.krisztavasas.db_library.dto.book.BookDto;
import com.krisztavasas.db_library.dto.book.BookSearchFilterDto;
import com.krisztavasas.db_library.dto.book.CreateBookDto;
import com.krisztavasas.db_library.dto.book.UpdateBookDto;
import com.krisztavasas.db_library.facade.BookFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookFacade bookFacade;
    private final StockConfig stockConfig;

    @GetMapping
    public Page<BookDto> getBooks(
            @ModelAttribute BookSearchFilterDto filter,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if (filter.hasAnyFilter()) {
            return bookFacade.searchWithFilters(filter, pageable);
        }
        return bookFacade.findAll(pageable);
    }

    @GetMapping("/search")
    public Page<BookDto> searchBooks(
            @RequestParam String q,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return bookFacade.fullTextSearch(q, pageable);
    }

    @GetMapping("/newest")
    public Page<BookDto> getNewestBooks(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return bookFacade.findNewest(pageable);
    }

    @GetMapping("/{id}")
    public BookDetailDto getBook(@PathVariable UUID id) {
        return bookFacade.findById(id);
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public List<BookDto> getLowStockBooks(
            @RequestParam(required = false) Integer threshold
    ) {
        int effectiveThreshold = threshold != null ? threshold : stockConfig.getLowThreshold();
        return bookFacade.findLowStock(effectiveThreshold);
    }

    @GetMapping("/top-weekly")
    public List<BookDto> getTopWeekly(@RequestParam(defaultValue = "10") int limit) {
        return bookFacade.findTopWeekly(limit);
    }

    @GetMapping("/top-monthly")
    public List<BookDto> getTopMonthly(@RequestParam(defaultValue = "10") int limit) {
        return bookFacade.findTopMonthly(limit);
    }

    @GetMapping("/{id}/recommendations")
    public List<BookDto> getRecommendations(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "6") int limit
    ) {
        return bookFacade.findRecommendations(id, limit);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public BookDetailDto createBook(@Valid @RequestBody CreateBookDto dto) {
        return bookFacade.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public BookDetailDto updateBook(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateBookDto dto
    ) {
        return bookFacade.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public void deleteBook(@PathVariable UUID id) {
        bookFacade.delete(id);
    }
}
