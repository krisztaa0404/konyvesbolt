package com.krisztavasas.db_library.repository;

import com.krisztavasas.db_library.config.StockConfig;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.Genre;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.enums.DiscountScopeType;
import com.krisztavasas.db_library.enums.StockStatus;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BookSpecification {

    private final StockConfig stockConfig;

    public Specification<Book> withFilters(
            String search,
            String title,
            List<UUID> genreIds,
            String author,
            String tag,
            String format,
            BigDecimal priceMin,
            BigDecimal priceMax,
            Integer yearFrom,
            Integer yearTo,
            Boolean inStock,
            UUID discountId,
            StockStatus stockStatus
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                List<Predicate> searchPredicates = new ArrayList<>();

                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        searchPattern
                ));

                Expression<String> authorsAsString = criteriaBuilder.function(
                        "array_to_string",
                        String.class,
                        root.get("authors"),
                        criteriaBuilder.literal(" ")
                );
                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(authorsAsString),
                        searchPattern
                ));

                Join<Book, Genre> genreJoin = root.join("genres", JoinType.LEFT);
                searchPredicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(genreJoin.get("name")),
                        searchPattern
                ));

                predicates.add(criteriaBuilder.or(searchPredicates.toArray(new Predicate[0])));

                query.distinct(true);
            }

            if (title != null && !title.isBlank()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%"
                ));
            }

            if (genreIds != null && !genreIds.isEmpty()) {
                Join<Book, Genre> genreJoin = root.join("genres", JoinType.INNER);
                predicates.add(genreJoin.get("id").in(genreIds));
            }

            if (author != null && !author.isBlank()) {
                Expression<String[]> authorsExpr = root.get("authors");
                predicates.add(criteriaBuilder.isTrue(
                        criteriaBuilder.function(
                                "array_contains",
                                Boolean.class,
                                authorsExpr,
                                criteriaBuilder.literal(author)
                        )
                ));
            }

            if (tag != null && !tag.isBlank()) {
                Expression<String[]> tagsExpr = root.get("tags");
                predicates.add(criteriaBuilder.isTrue(
                        criteriaBuilder.function(
                                "array_contains",
                                Boolean.class,
                                tagsExpr,
                                criteriaBuilder.literal(tag)
                        )
                ));
            }

            if (format != null && !format.isBlank()) {
                Expression<String[]> formatsExpr = root.get("availableFormats");
                predicates.add(criteriaBuilder.isTrue(
                        criteriaBuilder.function(
                                "array_contains",
                                Boolean.class,
                                formatsExpr,
                                criteriaBuilder.literal(format)
                        )
                ));
            }

            if (priceMin != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"),
                        priceMin
                ));
            }

            if (priceMax != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"),
                        priceMax
                ));
            }

            if (yearFrom != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("publicationYear"),
                        yearFrom
                ));
            }

            if (yearTo != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("publicationYear"),
                        yearTo
                ));
            }

            if (inStock != null && inStock) {
                predicates.add(criteriaBuilder.greaterThan(
                        root.get("stockQuantity"),
                        0
                ));
            }

            if (discountId != null) {
                Subquery<UUID> discountSubquery = query.subquery(UUID.class);
                Root<SeasonalDiscount> discountRoot = discountSubquery.from(SeasonalDiscount.class);
                discountSubquery.select(discountRoot.get("id"));

                Predicate discountExists = criteriaBuilder.equal(discountRoot.get("id"), discountId);

                Predicate isAllBooks = criteriaBuilder.equal(discountRoot.get("scopeType"), DiscountScopeType.ALL_BOOKS);

                Join<SeasonalDiscount, Book> discountBooks = discountRoot.join("applicableBooks", JoinType.LEFT);
                Predicate isSpecificBook = criteriaBuilder.and(
                        criteriaBuilder.equal(discountRoot.get("scopeType"), DiscountScopeType.SPECIFIC_BOOKS),
                        criteriaBuilder.equal(discountBooks.get("id"), root.get("id"))
                );

                discountSubquery.where(
                        criteriaBuilder.and(
                                discountExists,
                                criteriaBuilder.or(isAllBooks, isSpecificBook)
                        )
                );

                predicates.add(criteriaBuilder.exists(discountSubquery));
            }

            if (stockStatus != null) {
                int lowThreshold = stockConfig.getLowThreshold();
                switch (stockStatus) {
                    case IN_STOCK -> predicates.add(criteriaBuilder.greaterThan(
                            root.get("stockQuantity"),
                            lowThreshold
                    ));
                    case LOW_STOCK -> predicates.add(criteriaBuilder.and(
                            criteriaBuilder.greaterThan(root.get("stockQuantity"), 0),
                            criteriaBuilder.lessThanOrEqualTo(root.get("stockQuantity"), lowThreshold)
                    ));
                    case OUT_OF_STOCK -> predicates.add(criteriaBuilder.equal(
                            root.get("stockQuantity"),
                            0
                    ));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
