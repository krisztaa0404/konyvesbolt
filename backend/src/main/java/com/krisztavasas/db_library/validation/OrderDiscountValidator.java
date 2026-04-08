package com.krisztavasas.db_library.validation;

import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.repository.SeasonalDiscountRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Validator for order discount eligibility.
 * <p>
 * Checks if a discount ID is valid for use in an order by verifying:
 * - Discount exists
 * - Discount is active
 * - Discount is within valid date range
 * - Discount has not reached usage limit (if set)
 */
@Component
@RequiredArgsConstructor
public class OrderDiscountValidator implements ConstraintValidator<ValidOrderDiscount, UUID> {

    private final SeasonalDiscountRepository seasonalDiscountRepository;

    @Override
    public boolean isValid(UUID discountId, ConstraintValidatorContext context) {
        if (discountId == null) {
            return true;
        }

        SeasonalDiscount discount = seasonalDiscountRepository.findById(discountId).orElse(null);

        if (discount == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Discount not found")
                    .addConstraintViolation();
            return false;
        }

        if (!discount.getIsActive()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Discount is not active")
                    .addConstraintViolation();
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(discount.getValidFrom()) || now.isAfter(discount.getValidTo())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Discount is not valid at this time")
                    .addConstraintViolation();
            return false;
        }

        if (discount.getMaxUsageCount() != null &&
                discount.getCurrentUsageCount() >= discount.getMaxUsageCount()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Discount has reached maximum usage limit")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
