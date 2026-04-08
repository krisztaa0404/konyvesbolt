package com.krisztavasas.db_library.dto.csv;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * CSV DTO a felhasználók importálásához.
 */
@Data
public class UserCsvDto {

    @CsvBindByName(column = "id")
    private Long externalId;

    @CsvBindByName(column = "email")
    private String email;

    @CsvBindByName(column = "password_hash")
    private String passwordHash;

    @CsvBindByName(column = "first_name")
    private String firstName;

    @CsvBindByName(column = "last_name")
    private String lastName;

    @CsvBindByName(column = "phone")
    private String phone;

    @CsvBindByName(column = "is_loyalty_member")
    private Boolean isLoyaltyMember;

    @CsvBindByName(column = "loyalty_discount_percent")
    private String loyaltyDiscountPercent;

    @CsvBindByName(column = "total_spent")
    private String totalSpent;

    @CsvBindByName(column = "registration_date")
    private String registrationDate;

    @CsvBindByName(column = "address_data")
    private String addressData;

    @CsvBindByName(column = "preferences")
    private String preferences;
}
