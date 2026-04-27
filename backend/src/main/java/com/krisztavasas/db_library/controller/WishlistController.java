package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.wishlist.AddToWishlistDto;
import com.krisztavasas.db_library.dto.wishlist.WishlistDetailDto;
import com.krisztavasas.db_library.facade.WishlistFacade;
import com.krisztavasas.db_library.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistFacade wishlistFacade;

    @GetMapping
    public WishlistDetailDto getMyWishlist() {
        String email = SecurityUtils.getCurrentUserEmail();
        return wishlistFacade.getMyWishlist(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WishlistDetailDto addToWishlist(@Valid @RequestBody AddToWishlistDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        return wishlistFacade.addToWishlist(email, dto);
    }

    @DeleteMapping("/{bookId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeFromWishlist(@PathVariable UUID bookId) {
        String email = SecurityUtils.getCurrentUserEmail();
        wishlistFacade.removeFromWishlist(email, bookId);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearWishlist() {
        String email = SecurityUtils.getCurrentUserEmail();
        wishlistFacade.clearWishlist(email);
    }

    @GetMapping("/check/{bookId}")
    public boolean isInWishlist(@PathVariable UUID bookId) {
        String email = SecurityUtils.getCurrentUserEmail();
        return wishlistFacade.isInWishlist(email, bookId);
    }
}
