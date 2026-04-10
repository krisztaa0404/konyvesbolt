package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

@Data
public class BookUploadCsvDto {

    @CsvBindByName(column = "title", required = true)
    private String title;

    @CsvBindByName(column = "authors", required = true)
    private String authors;

    @CsvBindByName(column = "isbn", required = true)
    private String isbn;

    @CsvBindByName(column = "publisher", required = true)
    private String publisher;

    @CsvBindByName(column = "publicationYear", required = true)
    private String publicationYear;

    @CsvBindByName(column = "pageCount")
    private String pageCount;

    @CsvBindByName(column = "price", required = true)
    private String price;

    @CsvBindByName(column = "stockQuantity", required = true)
    private String stockQuantity;

    @CsvBindByName(column = "description")
    private String description;

    @CsvBindByName(column = "tags")
    private String tags;

    @CsvBindByName(column = "availableFormats", required = true)
    private String availableFormats;

    @CsvBindByName(column = "genres")
    private String genres;
    @CsvBindByName(column = "metadata_rating")
    private String metadataRating;

    @CsvBindByName(column = "metadata_readingAge")
    private String metadataReadingAge;

    @CsvBindByName(column = "metadata_dimensions")
    private String metadataDimensions;

    @CsvBindByName(column = "metadata_language")
    private String metadataLanguage;

    @CsvBindByName(column = "metadata_coverImageUrl")
    private String metadataCoverImageUrl;

    @CsvBindByName(column = "metadata_bestsellerRanks")
    private String metadataBestsellerRanks;

    @CsvBindByName(column = "metadata_seriesName")
    private String metadataSeriesName;

    @CsvBindByName(column = "metadata_seriesPosition")
    private String metadataSeriesPosition;
}
