package com.krisztavasas.db_library.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validation annotation for order discount eligibility.
 * <p>
 * Validates that if a discount ID is provided, the discount exists,
 * is active, and is within its valid date range.
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = OrderDiscountValidator.class)
@Documented
public @interface ValidOrderDiscount {
    String message() default "Invalid or inactive discount";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
