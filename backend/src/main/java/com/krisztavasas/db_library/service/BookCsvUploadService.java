package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.book.BookMetadataDto;
import com.krisztavasas.db_library.dto.book.BulkBookUploadResultDto;
import com.krisztavasas.db_library.dto.book.BulkBookUploadResultDto.SkippedRowDto;
import com.krisztavasas.db_library.dto.book.CreateBookDto;
import com.krisztavasas.db_library.dto.csv.BookUploadCsvDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.mapper.BookMapper;
import com.krisztavasas.db_library.repository.BookRepository;
import com.krisztavasas.db_library.repository.GenreRepository;
import com.krisztavasas.db_library.util.CsvParserUtil;
import com.opencsv.bean.CsvToBeanBuilder;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookCsvUploadService {

    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;
    private final BookMapper bookMapper;
    private final Validator validator;

    private final Map<String, Optional<Genre>> genreCache = new HashMap<>();
    @Transactional
    public BulkBookUploadResultDto processCsvUpload(MultipartFile file) {
        log.info("Starting CSV book upload processing");
        genreCache.clear();

        List<BookUploadCsvDto> csvRows;
        try {
            csvRows = new CsvToBeanBuilder<BookUploadCsvDto>(new InputStreamReader(file.getInputStream()))
                    .withType(BookUploadCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();
        } catch (Exception e) {
            log.error("Failed to parse CSV file: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid CSV file format: " + e.getMessage());
        }

        int totalRows = csvRows.size();
        int successCount = 0;
        List<SkippedRowDto> skippedRows = new ArrayList<>();

        for (int i = 0; i < csvRows.size(); i++) {
            int rowNumber = i + 2;
            BookUploadCsvDto csvDto = csvRows.get(i);

            try {
                CreateBookDto createDto = convertToCreateBookDto(csvDto);
                Set<ConstraintViolation<CreateBookDto>> violations = validator.validate(createDto);
                if (!violations.isEmpty()) {
                    List<String> validationErrors = violations.stream()
                            .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                            .collect(Collectors.toList());

                    skippedRows.add(new SkippedRowDto(
                            rowNumber,
                            csvDto.getTitle(),
                            csvDto.getIsbn(),
                            "Validation failed",
                            Collections.emptyList(),
                            validationErrors
                    ));
                    log.warn("Row {} skipped due to validation errors: {}", rowNumber, validationErrors);
                    continue;
                }

                String[] genreNames = CsvParserUtil.parseArray(csvDto.getGenres());
                Set<Genre> genres = new HashSet<>();
                List<String> missingGenres = new ArrayList<>();

                for (String genreName : genreNames) {
                    Optional<Genre> genreOpt = resolveGenre(genreName);
                    if (genreOpt.isPresent()) {
                        genres.add(genreOpt.get());
                    } else {
                        missingGenres.add(genreName);
                    }
                }

                if (!missingGenres.isEmpty()) {
                    skippedRows.add(new SkippedRowDto(
                            rowNumber,
                            csvDto.getTitle(),
                            csvDto.getIsbn(),
                            "Genre(s) not found in database",
                            missingGenres,
                            Collections.emptyList()
                    ));
                    log.warn("Row {} skipped due to missing genres: {}", rowNumber, missingGenres);
                    continue;
                }

                if (csvDto.getIsbn() != null && bookRepository.findByIsbn(csvDto.getIsbn()).isPresent()) {
                    skippedRows.add(new SkippedRowDto(
                            rowNumber,
                            csvDto.getTitle(),
                            csvDto.getIsbn(),
                            "Book with ISBN already exists",
                            Collections.emptyList(),
                            Collections.emptyList()
                    ));
                    log.warn("Row {} skipped: ISBN {} already exists", rowNumber, csvDto.getIsbn());
                    continue;
                }

                Book book = bookMapper.toEntity(createDto);
                book.setGenres(genres);
                bookRepository.save(book);
                successCount++;
                log.debug("Row {} successfully imported: {}", rowNumber, csvDto.getTitle());

            } catch (Exception e) {
                log.error("Error processing row {}: {}", rowNumber, e.getMessage(), e);
                skippedRows.add(new SkippedRowDto(
                        rowNumber,
                        csvDto.getTitle(),
                        csvDto.getIsbn(),
                        "Processing error: " + e.getMessage(),
                        Collections.emptyList(),
                        Collections.emptyList()
                ));
            }
        }

        int skippedCount = totalRows - successCount;
        String message = String.format("Successfully imported %d books, skipped %d rows", successCount, skippedCount);
        log.info("CSV upload complete: {}", message);

        return new BulkBookUploadResultDto(totalRows, successCount, skippedCount, message, skippedRows);
    }

    private CreateBookDto convertToCreateBookDto(BookUploadCsvDto csv) {
        return new CreateBookDto(
                csv.getTitle(),
                CsvParserUtil.parseArray(csv.getAuthors()),
                csv.getIsbn(),
                csv.getPublisher(),
                CsvParserUtil.parseInteger(csv.getPublicationYear(), "publicationYear"),
                CsvParserUtil.parseInteger(csv.getPageCount(), "pageCount"),
                CsvParserUtil.parseBigDecimal(csv.getPrice(), "price"),
                CsvParserUtil.parseInteger(csv.getStockQuantity(), "stockQuantity"),
                csv.getDescription(),
                CsvParserUtil.parseArray(csv.getTags()),
                CsvParserUtil.parseArray(csv.getAvailableFormats()),
                null,
                buildMetadata(csv)
        );
    }

    private BookMetadataDto buildMetadata(BookUploadCsvDto csv) {
        if (csv.getMetadataRating() == null &&
                csv.getMetadataReadingAge() == null &&
                csv.getMetadataDimensions() == null &&
                csv.getMetadataLanguage() == null &&
                csv.getMetadataCoverImageUrl() == null &&
                csv.getMetadataBestsellerRanks() == null &&
                csv.getMetadataSeriesName() == null &&
                csv.getMetadataSeriesPosition() == null) {
            return null;
        }

        return new BookMetadataDto(
                null,
                CsvParserUtil.parseDouble(csv.getMetadataRating()),
                null,
                csv.getMetadataReadingAge(),
                csv.getMetadataDimensions(),
                csv.getMetadataLanguage(),
                csv.getMetadataCoverImageUrl(),
                csv.getMetadataBestsellerRanks(),
                null,
                csv.getMetadataSeriesName(),
                CsvParserUtil.parseInteger(csv.getMetadataSeriesPosition(), "seriesPosition")
        );
    }

    private Optional<Genre> resolveGenre(String genreName) {
        if (genreName == null || genreName.trim().isEmpty()) {
            return Optional.empty();
        }

        String trimmedName = genreName.trim();
        return genreCache.computeIfAbsent(trimmedName, name -> {
            log.debug("Looking up genre: {}", name);
            return genreRepository.findByName(name);
        });
    }
}
