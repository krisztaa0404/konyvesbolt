package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a műfajok importálásához.
 */
@Data
public class GenreCsvDto {

    @CsvBindByName(column = "id")
    private Long externalId;

    @CsvBindByName(column = "name")
    private String name;

    @CsvBindByName(column = "description")
    private String description;
}
