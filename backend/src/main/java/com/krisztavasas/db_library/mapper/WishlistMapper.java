package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.wishlist.WishlistDetailDto;
import com.krisztavasas.db_library.dto.wishlist.WishlistDto;
import com.krisztavasas.db_library.dto.wishlist.WishlistItemDto;
import com.krisztavasas.db_library.entity.Wishlist;
import com.krisztavasas.db_library.entity.WishlistItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {BookMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface WishlistMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "itemCount", expression = "java(wishlist.getItems() != null ? wishlist.getItems().size() : 0)")
    WishlistDto toDto(Wishlist wishlist);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "itemCount", expression = "java(wishlist.getItems() != null ? wishlist.getItems().size() : 0)")
    WishlistDetailDto toDetailDto(Wishlist wishlist);

    List<WishlistItemDto> toItemDtos(List<WishlistItem> items);

    @Mapping(target = "bookId", source = "book.id")
    WishlistItemDto toItemDto(WishlistItem item);
}
