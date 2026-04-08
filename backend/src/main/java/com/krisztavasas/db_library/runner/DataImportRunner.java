package com.krisztavasas.db_library.runner;

import com.krisztavasas.db_library.service.DataImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * ApplicationRunner a CSV adatok importálásához.
 * <p>
 * Automatikusan elindul az alkalmazás indulásakor, ha az app.data.import.enabled property true értékű.
 * Az importálási sorrend: Users → Genres → Books → BookGenres → Orders → OrderItems
 * Ez biztosítja, hogy a referenciális integritás megmaradjon.
 */
@Component
@ConditionalOnProperty(name = "app.data.import.enabled", havingValue = "true")
@RequiredArgsConstructor
@Slf4j
public class DataImportRunner implements ApplicationRunner {

    private final DataImportService dataImportService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("=".repeat(60));
        log.info("Starting CSV data import...");
        log.info("=".repeat(60));

        try {
            // 1. Import Users
            String usersPath = getResourcePath("csv/users_test_data.csv");
            if (usersPath != null) {
                int userCount = dataImportService.importUsers(usersPath);
                log.info("✓ Users imported: {}", userCount);
            } else {
                log.warn("✗ Users CSV file not found, skipping...");
            }

            // 2. Import Genres
            String genresPath = getResourcePath("csv/genres_test_data.csv");
            if (genresPath != null) {
                int genreCount = dataImportService.importGenres(genresPath);
                log.info("✓ Genres imported: {}", genreCount);
            } else {
                log.warn("✗ Genres CSV file not found, skipping...");
            }

            // 3. Import Books
            String booksPath = getResourcePath("csv/books_test_data.csv");
            if (booksPath != null) {
                int bookCount = dataImportService.importBooks(booksPath);
                if (bookCount == 0) {
                    throw new RuntimeException("Failed to import books. Aborting import process.");
                }
                log.info("✓ Books imported: {}", bookCount);
            } else {
                log.warn("✗ Books CSV file not found, skipping...");
            }

            // 4. Import Book-Genre relationships
            String bookGenresPath = getResourcePath("csv/books_genre_test_data.csv");
            if (bookGenresPath != null) {
                int bgCount = dataImportService.importBookGenres(bookGenresPath);
                log.info("✓ Book-Genre relationships imported: {}", bgCount);
            } else {
                log.warn("✗ Book-Genres CSV file not found, skipping...");
            }

            // 5. Import Orders
            String ordersPath = getResourcePath("csv/orders_test_data.csv");
            if (ordersPath != null) {
                int orderCount = dataImportService.importOrders(ordersPath);
                log.info("✓ Orders imported: {}", orderCount);
            } else {
                log.warn("✗ Orders CSV file not found, skipping...");
            }

            // 6. Import Order Items
            String orderItemsPath = getResourcePath("csv/order_items_test_data.csv");
            if (orderItemsPath != null) {
                int orderItemCount = dataImportService.importOrderItems(orderItemsPath);
                log.info("✓ Order Items imported: {}", orderItemCount);
            } else {
                log.warn("✗ Order Items CSV file not found, skipping...");
            }

            // Clear caches
            dataImportService.clearCaches();

            log.info("=".repeat(60));
            log.info("CSV data import completed successfully!");
            log.info("=".repeat(60));
        } catch (Exception e) {
            log.error("=".repeat(60));
            log.error("Error during CSV data import: {}", e.getMessage(), e);
            log.error("=".repeat(60));
            throw e;
        }
    }

    /**
     * Lekéri az erőforrás fájl abszolút elérési útját.
     * Ha a fájl nem létezik, null értéket ad vissza.
     */
    private String getResourcePath(String resourcePath) {
        try {
            ClassPathResource resource = new ClassPathResource(resourcePath);
            if (resource.exists()) {
                File file = resource.getFile();
                return file.getAbsolutePath();
            }
        } catch (Exception e) {
            log.debug("Resource not found: {}", resourcePath);
        }
        return null;
    }
}
