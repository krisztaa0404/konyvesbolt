package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.book.BookDetailDto;
import com.krisztavasas.db_library.dto.book.BookDto;
import com.krisztavasas.db_library.dto.book.CreateBookDto;
import com.krisztavasas.db_library.dto.book.UpdateBookDto;
import com.krisztavasas.db_library.entity.Book;
import com.krisztavasas.db_library.repository.projection.TopBookProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {GenreMapper.class, ValueObjectMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BookMapper {

    @Mapping(target = "coverImageUrl", expression = "java(extractCoverImageUrl(book))")
    @Mapping(target = "deleted", expression = "java(isDeleted(book))")
    BookDto toDto(Book book);

    BookDto toDto(TopBookProjection projection);

    @Mapping(target = "coverImageUrl", expression = "java(extractCoverImageUrl(book))")
    @Mapping(source = "pages", target = "pageCount")
    @Mapping(target = "metadata", source = "metadata")
    BookDetailDto toDetailDto(Book book);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", ignore = true)
    @Mapping(target = "salesCount", constant = "0")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "genres", ignore = true)
    @Mapping(source = "pageCount", target = "pages")
    @Mapping(target = "metadata", source = "metadata")
    Book toEntity(CreateBookDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", ignore = true)
    @Mapping(target = "salesCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "genres", ignore = true)
    @Mapping(source = "pageCount", target = "pages")
    @Mapping(target = "metadata", source = "metadata")
    void updateEntity(UpdateBookDto dto, @MappingTarget Book book);

    default String extractCoverImageUrl(Book book) {
        if (book.getMetadata() == null) {
            return null;
        }
        return book.getMetadata().coverImageUrl();
    }

    default boolean isDeleted(Book book) {
        return book != null && book.getDeletedAt() != null;
    }
}
