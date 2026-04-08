package com.krisztavasas.db_library.validation;

import com.krisztavasas.db_library.dto.discount.CreateSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.UpdateSeasonalDiscountDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;

/**
 * Validátor a dátum tartomány ellenőrzéséhez.
 */
public class DateRangeValidator implements ConstraintValidator<ValidDateRange, Object> {

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        LocalDateTime validFrom = null;
        LocalDateTime validTo = null;

        if (value instanceof CreateSeasonalDiscountDto dto) {
            validFrom = dto.validFrom();
            validTo = dto.validTo();
        } else if (value instanceof UpdateSeasonalDiscountDto dto) {
            validFrom = dto.validFrom();
            validTo = dto.validTo();
        }

        if (validFrom == null || validTo == null) {
            return true;
        }

        if (!validFrom.isBefore(validTo)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "validFrom must be before validTo"
            ).addConstraintViolation();
            return false;
        }

        return true;
    }
}
