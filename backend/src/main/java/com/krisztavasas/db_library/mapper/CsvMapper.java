package com.krisztavasas.db_library.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krisztavasas.db_library.dto.csv.*;
import com.krisztavasas.db_library.entity.*;
import com.krisztavasas.db_library.enums.OrderStatus;
import com.krisztavasas.db_library.valueobject.*;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * MapStruct mapper CSV DTO-k és Entity-k közötti konverzióhoz.
 */
@Slf4j
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class CsvMapper {

    protected static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    protected static final ObjectMapper objectMapper = new ObjectMapper();

    // ==================== User Mapping ====================

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "externalId")
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "email", source = "email")
    @Mapping(target = "passwordHash", source = "passwordHash")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "isLoyaltyMember", source = "isLoyaltyMember")
    @Mapping(target = "loyaltyDiscountPercent", source = "loyaltyDiscountPercent", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "totalSpent", source = "totalSpent", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "registrationDate", source = "registrationDate", qualifiedByName = "stringToLocalDateTime")
    @Mapping(target = "addressData", source = "addressData", qualifiedByName = "jsonStringToUserAddressList")
    @Mapping(target = "preferences", source = "preferences", qualifiedByName = "jsonStringToUserPreferences")
    public abstract User toUser(UserCsvDto dto);

    // ==================== Genre Mapping ====================

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "externalId")
    @Mapping(target = "books", ignore = true)
    public abstract Genre toGenre(GenreCsvDto dto);

    // ==================== Book Mapping ====================

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "externalId")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "isbn", source = "isbn")
    @Mapping(target = "publisher", source = "publisher")
    @Mapping(target = "publicationYear", source = "publicationYear", qualifiedByName = "stringToInteger")
    @Mapping(target = "pages", source = "pages", qualifiedByName = "stringToInteger")
    @Mapping(target = "price", source = "price", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "stockQuantity", source = "stockQuantity", qualifiedByName = "stringToInteger")
    @Mapping(target = "salesCount", source = "salesCount", qualifiedByName = "stringToInteger")
    @Mapping(target = "createdAt", source = "createdAt", qualifiedByName = "stringToLocalDateTime")
    @Mapping(target = "updatedAt", source = "updatedAt", qualifiedByName = "stringToLocalDateTime")
    @Mapping(target = "authors", source = "authors", qualifiedByName = "parseArray")
    @Mapping(target = "tags", source = "tags", qualifiedByName = "parseArray")
    @Mapping(target = "availableFormats", source = "availableFormats", qualifiedByName = "parseArray")
    @Mapping(target = "metadata", source = "metadata", qualifiedByName = "jsonStringToBookMetadata")
    @Mapping(target = "genres", ignore = true)
    public abstract Book toBook(BookCsvDto dto);

    // ==================== Order Mapping ====================

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "externalId")
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "orderDate", source = "orderDate", qualifiedByName = "stringToLocalDateTime")
    @Mapping(target = "totalAmount", source = "totalAmount", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "discountAmount", source = "discountAmount", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "status", source = "status", qualifiedByName = "stringToOrderStatus")
    @Mapping(target = "shippingAddress", source = "shippingAddress", qualifiedByName = "jsonStringToShippingAddress")
    @Mapping(target = "paymentInfo", source = "paymentInfo", qualifiedByName = "jsonStringToPaymentInfo")
    @Mapping(target = "updatedAt", ignore = true)
public abstract Order toOrder(OrderCsvDto dto);

    // ==================== OrderItem Mapping ====================

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "book", ignore = true)
    @Mapping(target = "format", source = "format")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "unitPrice", source = "unitPrice", qualifiedByName = "stringToBigDecimal")
    @Mapping(target = "subtotal", source = "subtotal", qualifiedByName = "stringToBigDecimal")
    public abstract OrderItem toOrderItem(OrderItemCsvDto dto);

    // ==================== Helper Methods ====================

    @Named("stringToBigDecimal")
    protected BigDecimal stringToBigDecimal(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return new BigDecimal(value);
    }

    @Named("stringToInteger")
    protected Integer stringToInteger(String value) {
        if (value == null || value.isEmpty()) {
            return 0;
        }
        try {
            double doubleValue = Double.parseDouble(value);
            return (int) doubleValue;
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    @Named("stringToLocalDateTime")
    protected LocalDateTime stringToLocalDateTime(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }

        // Try multiple date formats
        String[] formats = {
            "yyyy-MM-dd HH:mm:ss",
            "M/d/yy HH:mm",
            "MM/dd/yyyy HH:mm:ss",
            "yyyy-MM-dd'T'HH:mm:ss"
        };

        for (String format : formats) {
            try {
                return LocalDateTime.parse(value, DateTimeFormatter.ofPattern(format));
            } catch (Exception e) {
                // Try next format
            }
        }

        // If all formats fail, log and return null
        log.warn("Could not parse date: {}", value);
        return null;
    }

    @Named("stringToOrderStatus")
    protected OrderStatus stringToOrderStatus(String value) {
        if (value == null || value.isEmpty()) {
            return OrderStatus.PENDING;
        }
        return OrderStatus.valueOf(value.toUpperCase());
    }

    @Named("parseArray")
    protected String[] parseArray(String value) {
        if (value == null || value.isEmpty()) {
            return new String[0];
        }

        // PostgreSQL array format: {val1,val2,val3} or {"val1","val2","val3"}
        if (value.startsWith("{") && value.endsWith("}")) {
            String content = value.substring(1, value.length() - 1);
            if (content.isEmpty()) {
                return new String[0];
            }

            // Split by comma and remove quotes
            String[] parts = content.split(",");
            for (int i = 0; i < parts.length; i++) {
                parts[i] = parts[i].trim().replaceAll("^\"|\"$", "");
            }
            return parts;
        }

        // Pipe-separated format: val1|val2|val3
        return value.split("\\|");
    }

    @Named("jsonStringToUserAddressList")
    protected List<UserAddress> jsonStringToUserAddressList(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(value, new TypeReference<List<UserAddress>>() {});
        } catch (JsonProcessingException e) {
            log.warn("Could not parse UserAddress list: {}", value);
            return null;
        }
    }

    @Named("jsonStringToShippingAddress")
    protected ShippingAddress jsonStringToShippingAddress(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(value, ShippingAddress.class);
        } catch (JsonProcessingException e) {
            log.warn("Could not parse ShippingAddress: {}", value);
            return null;
        }
    }

    @Named("jsonStringToPaymentInfo")
    protected PaymentInfo jsonStringToPaymentInfo(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(value, PaymentInfo.class);
        } catch (JsonProcessingException e) {
            log.warn("Could not parse PaymentInfo: {}", value);
            return null;
        }
    }

    @Named("jsonStringToUserPreferences")
    protected UserPreferences jsonStringToUserPreferences(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(value, UserPreferences.class);
        } catch (JsonProcessingException e) {
            log.warn("Could not parse UserPreferences: {}", value);
            return null;
        }
    }

    @Named("jsonStringToBookMetadata")
    protected BookMetadata jsonStringToBookMetadata(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(value, BookMetadata.class);
        } catch (JsonProcessingException e) {
            log.warn("Could not parse BookMetadata: {}", value);
            return null;
        }
    }
}
