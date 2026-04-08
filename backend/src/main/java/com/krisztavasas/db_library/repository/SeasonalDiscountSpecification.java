package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.enums.DiscountScopeType;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Specifikációk a SeasonalDiscount entitás dinamikus szűréséhez.
 */
public class SeasonalDiscountSpecification {

    public static Specification<SeasonalDiscount> withFilters(
            String name,
            Boolean isActive,
            DiscountScopeType scopeType,
            LocalDateTime activeAt
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isBlank()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        "%" + name.toLowerCase() + "%"
                ));
            }

            if (isActive != null) {
                predicates.add(criteriaBuilder.equal(root.get("isActive"), isActive));
            }

            if (scopeType != null) {
                predicates.add(criteriaBuilder.equal(root.get("scopeType"), scopeType));
            }

            if (activeAt != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("validFrom"), activeAt));
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("validTo"), activeAt));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
