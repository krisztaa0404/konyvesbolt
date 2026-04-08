package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.dto.discount.DiscountFilterDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.enums.DiscountScopeType;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.SeasonalDiscountRepository;
import com.krisztavasas.db_library.repository.SeasonalDiscountSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for managing seasonal discounts.
 * <p>
 * Responsible for CRUD operations on SeasonalDiscount entities only.
 * Cross-domain orchestration is handled by SeasonalDiscountFacade.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeasonalDiscountService {

    private final SeasonalDiscountRepository seasonalDiscountRepository;

    public Page<SeasonalDiscount> findAll(DiscountFilterDto filter, Pageable pageable) {
        Specification<SeasonalDiscount> spec = SeasonalDiscountSpecification.withFilters(
                filter.name(),
                filter.isActive(),
                filter.scopeType(),
                filter.activeAt()
        );
        return seasonalDiscountRepository.findAll(spec, pageable);
    }

    public SeasonalDiscount findById(UUID id) {
        return seasonalDiscountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seasonal discount not found with id: " + id));
    }

    public List<SeasonalDiscount> findCurrentlyActive() {
        return seasonalDiscountRepository.findCurrentlyActive(LocalDateTime.now());
    }

    @Transactional
    public SeasonalDiscount create(SeasonalDiscount discount) {
        return seasonalDiscountRepository.save(discount);
    }

    @Transactional
    public SeasonalDiscount update(SeasonalDiscount discount) {
        return seasonalDiscountRepository.save(discount);
    }

    @Transactional
    public void activate(UUID id) {
        SeasonalDiscount discount = seasonalDiscountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seasonal discount not found with id: " + id));
        discount.setIsActive(true);
        seasonalDiscountRepository.save(discount);
    }

    @Transactional
    public void deactivate(UUID id) {
        SeasonalDiscount discount = seasonalDiscountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seasonal discount not found with id: " + id));
        discount.setIsActive(false);
        seasonalDiscountRepository.save(discount);
    }

    @Transactional
    public void delete(UUID id) {
        SeasonalDiscount discount = seasonalDiscountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seasonal discount not found with id: " + id));
        seasonalDiscountRepository.delete(discount);
    }

    public SeasonalDiscount validateDiscountForOrder(UUID discountId, List<Book> books, BigDecimal orderTotal) {
        SeasonalDiscount discount = seasonalDiscountRepository.findById(discountId)
                .orElseThrow(() -> new EntityNotFoundException("Discount not found with id: " + discountId));

        if (orderTotal.compareTo(discount.getMinimumOrderAmount()) < 0) {
            throw new IllegalArgumentException(
                    "Order total does not meet minimum amount requirement of " + discount.getMinimumOrderAmount()
            );
        }

        if (discount.getScopeType() == DiscountScopeType.SPECIFIC_BOOKS) {
            Set<UUID> discountBookIds = discount.getApplicableBooks().stream()
                    .map(Book::getId)
                    .collect(Collectors.toSet());

            boolean hasApplicableBook = books.stream()
                    .anyMatch(book -> discountBookIds.contains(book.getId()));

            if (!hasApplicableBook) {
                throw new IllegalArgumentException("Discount does not apply to any books in this order");
            }
        }

        return discount;
    }

    @Transactional
    public void incrementUsageCount(SeasonalDiscount discount) {
        discount.setCurrentUsageCount(discount.getCurrentUsageCount() + 1);
        seasonalDiscountRepository.save(discount);
    }
}
