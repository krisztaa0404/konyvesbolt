package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.entity.Order;
import com.krisztavasas.db_library.enums.OrderStatus;
import com.krisztavasas.db_library.entity.User;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OrderSpecification {

    public static Specification<Order> withFilters(
            String search,
            List<OrderStatus> statuses,
            UUID userId,
            LocalDateTime dateFrom,
            LocalDateTime dateTo
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Join<Order, User> userJoin = root.join("user", JoinType.INNER);

                Predicate searchPredicate = criteriaBuilder.or(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(userJoin.get("email")),
                                searchPattern
                        ),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(userJoin.get("firstName")),
                                searchPattern
                        ),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(userJoin.get("lastName")),
                                searchPattern
                        ),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        criteriaBuilder.concat(
                                                criteriaBuilder.concat(userJoin.get("firstName"), " "),
                                                userJoin.get("lastName")
                                        )
                                ),
                                searchPattern
                        )
                );
                predicates.add(searchPredicate);
            }

            if (statuses != null && !statuses.isEmpty()) {
                predicates.add(root.get("status").in(statuses));
            }

            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));
            }

            if (dateFrom != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("orderDate"), dateFrom));
            }

            if (dateTo != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("orderDate"), dateTo));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
