package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.book.BookSearchFilterDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.BookRepository;
import com.krisztavasas.db_library.repository.BookSpecification;
import com.krisztavasas.db_library.repository.projection.TopBookProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;
    private final BookSpecification bookSpecification;

    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public Page<Book> searchWithFilters(BookSearchFilterDto filter, Pageable pageable) {
        Specification<Book> spec = bookSpecification.withFilters(
                filter.search(), filter.title(), filter.genreIds(), filter.author(), filter.tag(), filter.format(),
                filter.priceMin(), filter.priceMax(), filter.yearFrom(), filter.yearTo(), filter.inStock(),
                filter.discountId(), filter.stockStatus()
        );
        return bookRepository.findAll(spec, pageable);
    }

    public Page<Book> fullTextSearch(String query, Pageable pageable) {
        return bookRepository.fullTextSearchByTitle(query, pageable);
    }

    public Page<Book> findNewest(Pageable pageable) {
        return bookRepository.findNewest(pageable);
    }

    public Book findById(UUID id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));
    }

    public List<Book> findLowStock(int threshold) {
        return bookRepository.findLowStock(threshold);
    }

    public List<TopBookProjection> findTopWeekly(int limit) {
        return bookRepository.findTopWeekly(limit);
    }

    public List<TopBookProjection> findTopMonthly(int limit) {
        return bookRepository.findTopMonthly(limit);
    }

    public List<Book> findRecommendations(UUID bookId, int limit) {
        List<Book> recommendations = bookRepository.findRecommendations(bookId, limit);

        if (recommendations.isEmpty()) {
            return recommendations;
        }

        List<UUID> bookIds = recommendations.stream()
                .map(Book::getId)
                .toList();

        List<Book> booksWithGenres = bookRepository.findByIdsWithGenres(bookIds);

        Map<UUID, Book> bookMap = booksWithGenres.stream()
                .collect(java.util.stream.Collectors.toMap(Book::getId, book -> book));

        return recommendations.stream()
                .map(book -> bookMap.get(book.getId()))
                .toList();
    }

    public List<Book> findTopBooksByGenre(UUID genreId, int limit) {
        return bookRepository.findTopBooksByGenre(genreId, limit);
    }

    @Transactional
    public void delete(UUID id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));
        book.setDeletedAt(java.time.LocalDateTime.now());
        bookRepository.save(book);
    }

    public Book findByIdForUpdate(UUID id) {
        return bookRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));
    }

    @Transactional
    public void updateStock(Book book, int quantityChange, int salesChange) {
        book.setStockQuantity(book.getStockQuantity() + quantityChange);
        book.setSalesCount(book.getSalesCount() + salesChange);
        bookRepository.save(book);
    }

    @Transactional
    public void updateStockBatch(UUID bookId, int quantityChange, int salesChange) {
        bookRepository.updateStockBatch(bookId, quantityChange, salesChange);
    }

    @Transactional
    public Book create(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public Book update(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> findByIds(List<UUID> ids) {
        List<Book> books = bookRepository.findAllById(ids);
        if (books.size() != ids.size()) {
            throw new EntityNotFoundException("Some books not found");
        }
        return books;
    }

    public List<Book> findByGenre(Genre genre) {
        return bookRepository.findByGenresContaining(genre);
    }

    public long countLowStock(int threshold) {
        return bookRepository.countLowStock(threshold);
    }
}
