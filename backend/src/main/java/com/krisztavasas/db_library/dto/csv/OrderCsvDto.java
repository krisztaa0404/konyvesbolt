package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a rendelések importálásához.
 */
@Data
public class OrderCsvDto {

    @CsvBindByName(column = "id")
    private Long externalId;

    @CsvBindByName(column = "user_id")
    private Long userExternalId;

    @CsvBindByName(column = "order_date")
    private String orderDate;

    @CsvBindByName(column = "total_amount")
    private String totalAmount;

    @CsvBindByName(column = "discount_amount")
    private String discountAmount;

    @CsvBindByName(column = "status")
    private String status;

    @CsvBindByName(column = "shipping_address")
    private String shippingAddress;

    @CsvBindByName(column = "payment_info")
    private String paymentInfo;
}
