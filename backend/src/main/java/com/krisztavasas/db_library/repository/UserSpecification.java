package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.enums.UserRole;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserSpecification {

    public Specification<User> withFilters(
            String search,
            UserRole role,
            Boolean isLoyaltyMember
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                List<Predicate> searchPredicates = new ArrayList<>();

                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("firstName")),
                        searchPattern
                ));

                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("lastName")),
                        searchPattern
                ));

                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("email")),
                        searchPattern
                ));

                predicates.add(criteriaBuilder.or(searchPredicates.toArray(new Predicate[0])));
            }

            if (role != null) {
                predicates.add(criteriaBuilder.equal(root.get("role"), role));
            }

            if (isLoyaltyMember != null) {
                predicates.add(criteriaBuilder.equal(root.get("isLoyaltyMember"), isLoyaltyMember));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
