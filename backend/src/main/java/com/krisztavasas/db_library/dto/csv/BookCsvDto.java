package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a könyvek importálásához.
 */
@Data
public class BookCsvDto {

    @CsvBindByName(column = "id")
    private Long externalId;

    @CsvBindByName(column = "title")
    private String title;

    @CsvBindByName(column = "isbn")
    private String isbn;

    @CsvBindByName(column = "publisher")
    private String publisher;

    @CsvBindByName(column = "publication_year")
    private String publicationYear;

    @CsvBindByName(column = "pages")
    private String pages;

    @CsvBindByName(column = "price")
    private String price;

    @CsvBindByName(column = "description")
    private String description;

    @CsvBindByName(column = "stock_quantity")
    private String stockQuantity;

    @CsvBindByName(column = "sales_count")
    private String salesCount;

    @CsvBindByName(column = "created_at")
    private String createdAt;

    @CsvBindByName(column = "updated_at")
    private String updatedAt;

    @CsvBindByName(column = "authors")
    private String authors;

    @CsvBindByName(column = "tags")
    private String tags;

    @CsvBindByName(column = "available_formats")
    private String availableFormats;

    @CsvBindByName(column = "metadata")
    private String metadata;
}
