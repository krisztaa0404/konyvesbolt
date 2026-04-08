package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a könyv-műfaj kapcsolat importálásához.
 */
@Data
public class BookGenreCsvDto {

    @CsvBindByName(column = "book_id")
    private Long bookExternalId;

    @CsvBindByName(column = "genre_id")
    private Long genreExternalId;
}
