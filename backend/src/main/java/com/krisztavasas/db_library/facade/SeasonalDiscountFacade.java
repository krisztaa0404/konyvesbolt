package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.discount.CreateSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.DiscountFilterDto;
import com.krisztavasas.db_library.dto.discount.SeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.UpdateSeasonalDiscountDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.enums.DiscountScopeType;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.mapper.SeasonalDiscountMapper;
import com.krisztavasas.db_library.service.BookService;
import com.krisztavasas.db_library.service.GenreService;
import com.krisztavasas.db_library.service.SeasonalDiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeasonalDiscountFacade {

    private final SeasonalDiscountService seasonalDiscountService;
    private final BookService bookService;
    private final GenreService genreService;
    private final SeasonalDiscountMapper seasonalDiscountMapper;

    public Page<SeasonalDiscountDto> findAll(DiscountFilterDto filter, Pageable pageable) {
        return seasonalDiscountService.findAll(filter, pageable)
                .map(seasonalDiscountMapper::toDto);
    }

    public SeasonalDiscountDto findById(UUID id) {
        SeasonalDiscount discount = seasonalDiscountService.findById(id);
        return seasonalDiscountMapper.toDto(discount);
    }

    public List<SeasonalDiscountDto> findCurrentlyActive() {
        return seasonalDiscountService.findCurrentlyActive().stream()
                .map(seasonalDiscountMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public SeasonalDiscountDto create(CreateSeasonalDiscountDto dto) {
        SeasonalDiscount discount = seasonalDiscountMapper.toEntity(dto);
        applyDiscountScope(discount, dto.bookIds(), dto.genreIds(), dto.allBooks());
        SeasonalDiscount saved = seasonalDiscountService.create(discount);
        return seasonalDiscountMapper.toDto(saved);
    }

    @Transactional
    public SeasonalDiscountDto update(UUID id, UpdateSeasonalDiscountDto dto) {
        SeasonalDiscount discount = seasonalDiscountService.findById(id);
        seasonalDiscountMapper.updateEntity(dto, discount);

        boolean scopeChanged = dto.bookIds() != null || dto.genreIds() != null || dto.allBooks() != null;

        if (scopeChanged) {
            applyDiscountScope(discount, dto.bookIds(), dto.genreIds(), dto.allBooks());
        }

        SeasonalDiscount saved = seasonalDiscountService.update(discount);
        return seasonalDiscountMapper.toDto(saved);
    }

    @Transactional
    public void activate(UUID id) {
        seasonalDiscountService.activate(id);
    }

    @Transactional
    public void deactivate(UUID id) {
        seasonalDiscountService.deactivate(id);
    }

    @Transactional
    public void delete(UUID id) {
        seasonalDiscountService.delete(id);
    }

    private void applyDiscountScope(SeasonalDiscount discount, List<UUID> bookIds, List<UUID> genreIds, Boolean allBooks) {
        if (Boolean.TRUE.equals(allBooks)) {
            discount.setScopeType(DiscountScopeType.ALL_BOOKS);
            discount.setApplicableBooks(new HashSet<>());
        } else {
            discount.setScopeType(DiscountScopeType.SPECIFIC_BOOKS);
            Set<Book> applicableBooks = new HashSet<>();

            if (bookIds != null && !bookIds.isEmpty()) {
                List<Book> books = bookService.findByIds(bookIds);
                applicableBooks.addAll(books);
            }

            if (genreIds != null && !genreIds.isEmpty()) {
                for (UUID genreId : genreIds) {
                    Genre genre = genreService.findById(genreId);
                    List<Book> booksInGenre = bookService.findByGenre(genre);
                    applicableBooks.addAll(booksInGenre);
                }
            }

            if (applicableBooks.isEmpty()) {
                throw new IllegalArgumentException(
                        "SPECIFIC_BOOKS discount must have at least one applicable book. " +
                        "The specified genres may not contain any books, or the book IDs are invalid."
                );
            }

            discount.setApplicableBooks(applicableBooks);
        }
    }
}
