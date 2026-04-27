package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.wishlist.AddToWishlistDto;
import com.krisztavasas.db_library.dto.wishlist.WishlistDetailDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.entity.User;
import com.krisztavasas.db_library.entity.Wishlist;
import com.krisztavasas.db_library.mapper.WishlistMapper;
import com.krisztavasas.db_library.service.BookService;
import com.krisztavasas.db_library.service.UserService;
import com.krisztavasas.db_library.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishlistFacade {

    private final WishlistService wishlistService;
    private final UserService userService;
    private final BookService bookService;
    private final WishlistMapper wishlistMapper;

    public WishlistDetailDto getMyWishlist(String userEmail) {
        User user = userService.findByEmail(userEmail);

        try {
            Wishlist wishlist = wishlistService.findByUserIdWithItems(user.getId());
            return wishlistMapper.toDetailDto(wishlist);
        } catch (Exception e) {
            Wishlist newWishlist = wishlistService.createWishlist(user);
            return wishlistMapper.toDetailDto(newWishlist);
        }
    }

    @Transactional
    public WishlistDetailDto addToWishlist(String userEmail, AddToWishlistDto dto) {
        User user = userService.findByEmail(userEmail);
        Book book = bookService.findById(dto.bookId());

        Wishlist wishlist = wishlistService.getOrCreateWishlist(user.getId());

        Wishlist updated = wishlistService.addItem(wishlist.getId(), book, user.getId());
        return wishlistMapper.toDetailDto(updated);
    }

    @Transactional
    public void removeFromWishlist(String userEmail, UUID bookId) {
        User user = userService.findByEmail(userEmail);
        Wishlist wishlist = wishlistService.findByUserId(user.getId());
        wishlistService.removeItem(wishlist.getId(), bookId, user.getId());
    }

    @Transactional
    public void clearWishlist(String userEmail) {
        User user = userService.findByEmail(userEmail);
        Wishlist wishlist = wishlistService.findByUserId(user.getId());
        wishlistService.clearWishlist(wishlist.getId(), user.getId());
    }

    public boolean isInWishlist(String userEmail, UUID bookId) {
        try {
            User user = userService.findByEmail(userEmail);
            Wishlist wishlist = wishlistService.findByUserIdWithItems(user.getId());
            return wishlist.containsBook(bookId);
        } catch (Exception e) {
            return false;
        }
    }
}
