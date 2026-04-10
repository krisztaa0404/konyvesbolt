package com.krisztavasas.db_library.util;

import java.math.BigDecimal;
import java.util.Arrays;

public class CsvParserUtil {

    private CsvParserUtil() {}

    public static String[] parseArray(String value) {
        if (value == null || value.trim().isEmpty()) {
            return new String[0];
        }
        return Arrays.stream(value.split("\\|"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);
    }

    public static Integer parseInteger(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid integer value for " + fieldName + ": " + value);
        }
    }

    public static BigDecimal parseBigDecimal(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return new BigDecimal(value.trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid decimal value for " + fieldName + ": " + value);
        }
    }

    public static Double parseDouble(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
