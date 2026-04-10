package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.discount.CreateSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.DetailedSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.DiscountFilterDto;
import com.krisztavasas.db_library.dto.discount.SeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.UpdateSeasonalDiscountDto;
import com.krisztavasas.db_library.facade.SeasonalDiscountFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST API vezérlő a szezonális kedvezmények kezeléséhez.
 * <p>
 * Publikus végpontok: lista lekérése, egyedi kedvezmény lekérése, aktív kedvezmények
 * Védett végpontok (Manager/Admin): létrehozás, frissítés, deaktiválás, törlés
 */
@RestController
@RequestMapping("/api/seasonal-discounts")
@RequiredArgsConstructor
public class SeasonalDiscountController {

    private final SeasonalDiscountFacade seasonalDiscountFacade;

    @GetMapping
    public Page<SeasonalDiscountDto> getAllDiscounts(
            @ModelAttribute DiscountFilterDto filter,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return seasonalDiscountFacade.findAll(filter, pageable);
    }

    @GetMapping("/{id}")
    public DetailedSeasonalDiscountDto getDiscount(@PathVariable UUID id) {
        return seasonalDiscountFacade.findByIdDetailed(id);
    }

    @GetMapping("/active")
    public List<SeasonalDiscountDto> getActiveDiscounts() {
        return seasonalDiscountFacade.findCurrentlyActive();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public SeasonalDiscountDto createDiscount(@Valid @RequestBody CreateSeasonalDiscountDto dto) {
        return seasonalDiscountFacade.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public SeasonalDiscountDto updateDiscount(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSeasonalDiscountDto dto
    ) {
        return seasonalDiscountFacade.update(id, dto);
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public void activateDiscount(@PathVariable UUID id) {
        seasonalDiscountFacade.activate(id);
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public void deactivateDiscount(@PathVariable UUID id) {
        seasonalDiscountFacade.deactivate(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public void deleteDiscount(@PathVariable UUID id) {
        seasonalDiscountFacade.delete(id);
    }
}
