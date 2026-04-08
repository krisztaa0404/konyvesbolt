package com.krisztavasas.db_library.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Validációs annotáció a kedvezmény hatókör ellenőrzéséhez.
 * <p>
 * Biztosítja, hogy a kedvezmény létrehozásakor pontosan egy hatókör legyen megadva:
 * - bookIds nem üres lista
 * - genreIds nem üres lista
 * - allBooks = true
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DiscountScopeValidator.class)
@Documented
public @interface ValidDiscountScope {
    String message() default "Exactly one scope must be specified: bookIds, genreIds, or allBooks";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
