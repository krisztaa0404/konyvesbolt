package com.krisztavasas.db_library.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validációs annotáció a dátum tartomány ellenőrzéséhez.
 * <p>
 * Biztosítja, hogy a validFrom dátum korábbi legyen, mint a validTo dátum.
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateRangeValidator.class)
@Documented
public @interface ValidDateRange {
    String message() default "validFrom must be before validTo";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
