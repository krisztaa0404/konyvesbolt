package com.krisztavasas.db_library.validation;

import com.krisztavasas.db_library.dto.discount.CreateSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.UpdateSeasonalDiscountDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;
import java.util.UUID;

/**
 * Validátor a kedvezmény hatókör ellenőrzéséhez.
 */
public class DiscountScopeValidator implements ConstraintValidator<ValidDiscountScope, Object> {

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        if (value instanceof CreateSeasonalDiscountDto dto) {
            return validateCreateDto(dto, context);
        } else if (value instanceof UpdateSeasonalDiscountDto dto) {
            return validateUpdateDto(dto, context);
        }

        return true;
    }

    private boolean validateCreateDto(CreateSeasonalDiscountDto dto, ConstraintValidatorContext context) {
        boolean hasBookIds = dto.bookIds() != null && !dto.bookIds().isEmpty();
        boolean hasGenreIds = dto.genreIds() != null && !dto.genreIds().isEmpty();
        boolean hasAllBooks = Boolean.TRUE.equals(dto.allBooks());

        int scopeCount = (hasBookIds ? 1 : 0) + (hasGenreIds ? 1 : 0) + (hasAllBooks ? 1 : 0);

        if (scopeCount == 0) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "At least one scope must be specified: bookIds, genreIds, or allBooks"
            ).addConstraintViolation();
            return false;
        }

        if (hasAllBooks && (hasBookIds || hasGenreIds)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "allBooks cannot be combined with bookIds or genreIds"
            ).addConstraintViolation();
            return false;
        }

        if (!hasAllBooks && !hasBookIds && !hasGenreIds) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "SPECIFIC_BOOKS scope requires at least one bookId or genreId"
            ).addConstraintViolation();
            return false;
        }

        return true;
    }

    private boolean validateUpdateDto(UpdateSeasonalDiscountDto dto, ConstraintValidatorContext context) {
        boolean hasAnyScope = dto.bookIds() != null || dto.genreIds() != null || dto.allBooks() != null;

        if (!hasAnyScope) {
            return true;
        }

        boolean hasBookIds = dto.bookIds() != null && !dto.bookIds().isEmpty();
        boolean hasGenreIds = dto.genreIds() != null && !dto.genreIds().isEmpty();
        boolean hasAllBooks = Boolean.TRUE.equals(dto.allBooks());

        if (hasAllBooks && (hasBookIds || hasGenreIds)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "allBooks cannot be combined with bookIds or genreIds"
            ).addConstraintViolation();
            return false;
        }

        return true;
    }
}
