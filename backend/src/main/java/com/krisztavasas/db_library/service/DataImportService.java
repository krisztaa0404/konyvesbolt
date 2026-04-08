package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.csv.*;
import com.krisztavasas.db_library.entity.*;
import com.krisztavasas.db_library.mapper.CsvMapper;
import com.krisztavasas.db_library.repository.*;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileReader;
import java.util.*;

/**
 * Service a CSV fájlok importálására.
 * <p>
 * Kezeli a CSV parsing-ot, DTO → Entity mapping-et (MapStruct segítségével), és batch mentést.
 * Külön cache-t tart az external ID → UUID mapping-hez a referenciális integritás biztosítására.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DataImportService {

    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final BookRepository bookRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CsvMapper csvMapper;

    // External ID → UUID cache
    private final Map<Long, UUID> userIdCache = new HashMap<>();
    private final Map<Long, UUID> genreIdCache = new HashMap<>();
    private final Map<Long, UUID> bookIdCache = new HashMap<>();
    private final Map<Long, UUID> orderIdCache = new HashMap<>();

    /**
     * Importálja a felhasználókat egy CSV fájlból.
     */
    @Transactional
    public int importUsers(String csvFilePath) {
        log.info("Importing users from: {}", csvFilePath);
        int count = 0;
        int skipped = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<UserCsvDto> dtos = new CsvToBeanBuilder<UserCsvDto>(reader)
                    .withType(UserCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            for (UserCsvDto dto : dtos) {
                try {
                    // Check if user already exists
                    if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
                        skipped++;
                        continue;
                    }

                    User user = csvMapper.toUser(dto);
                    User savedUser = userRepository.save(user);
                    userIdCache.put(savedUser.getExternalId(), savedUser.getId());
                    count++;
                } catch (Exception e) {
                    log.error("Error importing user {}: {}", dto.getEmail(), e.getMessage());
                    skipped++;
                }
            }

            log.info("Imported {} users (skipped {} duplicates)", count, skipped);
        } catch (Exception e) {
            log.error("Error importing users: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Importálja a műfajokat egy CSV fájlból.
     */
    @Transactional
    public int importGenres(String csvFilePath) {
        log.info("Importing genres from: {}", csvFilePath);
        int count = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<GenreCsvDto> dtos = new CsvToBeanBuilder<GenreCsvDto>(reader)
                    .withType(GenreCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            List<Genre> genres = new ArrayList<>();
            for (GenreCsvDto dto : dtos) {
                try {
                    Genre genre = csvMapper.toGenre(dto);
                    genres.add(genre);
                } catch (Exception e) {
                    log.error("Error mapping genre with external_id {}: {}", dto.getExternalId(), e.getMessage());
                }
            }

            List<Genre> savedGenres = genreRepository.saveAll(genres);
            for (Genre genre : savedGenres) {
                genreIdCache.put(genre.getExternalId(), genre.getId());
            }

            count = savedGenres.size();
            log.info("Imported {} genres", count);
        } catch (Exception e) {
            log.error("Error importing genres: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Importálja a könyveket egy CSV fájlból.
     */
    @Transactional
    public int importBooks(String csvFilePath) {
        log.info("Importing books from: {}", csvFilePath);
        int count = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<BookCsvDto> dtos = new CsvToBeanBuilder<BookCsvDto>(reader)
                    .withType(BookCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            List<Book> books = new ArrayList<>();
            for (BookCsvDto dto : dtos) {
                try {
                    Book book = csvMapper.toBook(dto);
                    books.add(book);
                } catch (Exception e) {
                    log.error("Error mapping book with external_id {}: {}", dto.getExternalId(), e.getMessage());
                }
            }

            List<Book> savedBooks = bookRepository.saveAll(books);
            for (Book book : savedBooks) {
                bookIdCache.put(book.getExternalId(), book.getId());
            }

            count = savedBooks.size();
            log.info("Imported {} books", count);
        } catch (Exception e) {
            log.error("Error importing books: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Importálja a könyv-műfaj kapcsolatokat egy CSV fájlból.
     */
    @Transactional
    public int importBookGenres(String csvFilePath) {
        log.info("Importing book-genre relationships from: {}", csvFilePath);
        int count = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<BookGenreCsvDto> dtos = new CsvToBeanBuilder<BookGenreCsvDto>(reader)
                    .withType(BookGenreCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            for (BookGenreCsvDto dto : dtos) {
                try {
                    UUID bookId = bookIdCache.get(dto.getBookExternalId());
                    UUID genreId = genreIdCache.get(dto.getGenreExternalId());

                    if (bookId == null || genreId == null) {
                        log.warn("Missing book or genre for relationship: book_id={}, genre_id={}",
                                dto.getBookExternalId(), dto.getGenreExternalId());
                        continue;
                    }

                    Book book = bookRepository.findById(bookId).orElse(null);
                    Genre genre = genreRepository.findById(genreId).orElse(null);

                    if (book != null && genre != null) {
                        book.getGenres().add(genre);
                        bookRepository.save(book);
                        count++;
                    }
                } catch (Exception e) {
                    log.error("Error creating book-genre relationship: {}", e.getMessage());
                }
            }

            log.info("Imported {} book-genre relationships", count);
        } catch (Exception e) {
            log.error("Error importing book-genre relationships: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Importálja a rendeléseket egy CSV fájlból.
     */
    @Transactional
    public int importOrders(String csvFilePath) {
        log.info("Importing orders from: {}", csvFilePath);
        int count = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<OrderCsvDto> dtos = new CsvToBeanBuilder<OrderCsvDto>(reader)
                    .withType(OrderCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            List<Order> orders = new ArrayList<>();
            for (OrderCsvDto dto : dtos) {
                try {
                    UUID userId = userIdCache.get(dto.getUserExternalId());
                    if (userId == null) {
                        log.warn("User not found for external_id: {}", dto.getUserExternalId());
                        continue;
                    }

                    User user = userRepository.findById(userId).orElse(null);
                    if (user == null) {
                        log.warn("User not found in database for id: {}", userId);
                        continue;
                    }

                    Order order = csvMapper.toOrder(dto);
                    order.setUser(user);
                    orders.add(order);
                } catch (Exception e) {
                    log.error("Error mapping order with external_id {}: {}", dto.getExternalId(), e.getMessage());
                }
            }

            List<Order> savedOrders = orderRepository.saveAll(orders);
            for (Order order : savedOrders) {
                orderIdCache.put(order.getExternalId(), order.getId());
            }

            count = savedOrders.size();
            log.info("Imported {} orders", count);
        } catch (Exception e) {
            log.error("Error importing orders: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Importálja a rendelési tételeket egy CSV fájlból.
     */
    @Transactional
    public int importOrderItems(String csvFilePath) {
        log.info("Importing order items from: {}", csvFilePath);
        int count = 0;

        try (FileReader reader = new FileReader(csvFilePath)) {
            List<OrderItemCsvDto> dtos = new CsvToBeanBuilder<OrderItemCsvDto>(reader)
                    .withType(OrderItemCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItemCsvDto dto : dtos) {
                try {
                    UUID orderId = orderIdCache.get(dto.getOrderExternalId());
                    UUID bookId = bookIdCache.get(dto.getBookExternalId());

                    if (orderId == null || bookId == null) {
                        log.warn("Missing order or book for order item: order_id={}, book_id={}",
                                dto.getOrderExternalId(), dto.getBookExternalId());
                        continue;
                    }

                    Order order = orderRepository.findById(orderId).orElse(null);
                    Book book = bookRepository.findById(bookId).orElse(null);

                    if (order == null || book == null) {
                        log.warn("Order or book not found in database");
                        continue;
                    }

                    OrderItem orderItem = csvMapper.toOrderItem(dto);
                    orderItem.setOrder(order);
                    orderItem.setBook(book);
                    orderItems.add(orderItem);
                } catch (Exception e) {
                    log.error("Error mapping order item: {}", e.getMessage());
                }
            }

            List<OrderItem> savedOrderItems = orderItemRepository.saveAll(orderItems);
            count = savedOrderItems.size();
            log.info("Imported {} order items", count);
        } catch (Exception e) {
            log.error("Error importing order items: {}", e.getMessage(), e);
        }

        return count;
    }

    /**
     * Törli az összes cache-t.
     */
    public void clearCaches() {
        userIdCache.clear();
        genreIdCache.clear();
        bookIdCache.clear();
        orderIdCache.clear();
    }
}
