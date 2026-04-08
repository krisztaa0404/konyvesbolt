package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a rendelési tételek importálásához.
 */
@Data
public class OrderItemCsvDto {

    @CsvBindByName(column = "id")
    private Long externalId;

    @CsvBindByName(column = "order_id")
    private Long orderExternalId;

    @CsvBindByName(column = "book_id")
    private Long bookExternalId;

    @CsvBindByName(column = "format")
    private String format;

    @CsvBindByName(column = "quantity")
    private Integer quantity;

    @CsvBindByName(column = "unit_price")
    private String unitPrice;

    @CsvBindByName(column = "subtotal")
    private String subtotal;
}
