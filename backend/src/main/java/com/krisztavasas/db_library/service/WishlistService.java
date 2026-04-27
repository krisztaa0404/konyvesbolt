package com.krisztavasas.db_library.service;

import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.entity.Wishlist;
import com.krisztavasas.db_library.entity.WishlistItem;
import com.krisztavasas.db_library.exception.EntityNotFoundException;
import com.krisztavasas.db_library.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public Wishlist findById(UUID id) {
        return wishlistRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Wishlist not found with id: " + id));
    }

    public Wishlist findByIdWithItems(UUID id) {
        return wishlistRepository.findByIdWithItems(id)
            .orElseThrow(() -> new EntityNotFoundException("Wishlist not found with id: " + id));
    }

    public Wishlist findByUserId(UUID userId) {
        return wishlistRepository.findByUserId(userId)
            .orElseThrow(() -> new EntityNotFoundException("Wishlist not found for user: " + userId));
    }

    public Wishlist findByUserIdWithItems(UUID userId) {
        return wishlistRepository.findByUserIdWithItems(userId)
            .orElseThrow(() -> new EntityNotFoundException("Wishlist not found for user: " + userId));
    }

    @Transactional
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = Wishlist.builder()
            .user(user)
            .build();
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public Wishlist getOrCreateWishlist(UUID userId) {
        return wishlistRepository.findByUserId(userId)
            .orElseGet(() -> {
                Wishlist wishlist = Wishlist.builder()
                    .user(User.builder().id(userId).build())
                    .build();
                return wishlistRepository.save(wishlist);
            });
    }

    @Transactional
    public Wishlist addItem(UUID wishlistId, Book book, UUID userId) {
        Wishlist wishlist = findByIdWithItems(wishlistId);

        if (!wishlist.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to wishlist");
        }

        if (wishlist.containsBook(book.getId())) {
            throw new IllegalArgumentException("Book already in wishlist");
        }

        WishlistItem item = WishlistItem.builder()
            .wishlist(wishlist)
            .book(book)
            .build();

        wishlist.addItem(item);
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public void removeItem(UUID wishlistId, UUID bookId, UUID userId) {
        Wishlist wishlist = findByIdWithItems(wishlistId);

        if (!wishlist.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to wishlist");
        }

        wishlist.getItems().removeIf(item -> item.getBook().getId().equals(bookId));
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void clearWishlist(UUID wishlistId, UUID userId) {
        Wishlist wishlist = findByIdWithItems(wishlistId);

        if (!wishlist.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to wishlist");
        }

        wishlist.getItems().clear();
        wishlistRepository.save(wishlist);
    }
}
