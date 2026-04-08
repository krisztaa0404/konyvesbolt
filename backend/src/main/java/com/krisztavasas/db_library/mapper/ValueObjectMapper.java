package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.common.AddressDto;
import com.krisztavasas.db_library.dto.order.PaymentInfoDto;
import com.krisztavasas.db_library.dto.user.PreferencesDto;
import com.krisztavasas.db_library.dto.book.BookMetadataDto;
import com.krisztavasas.db_library.valueobject.ShippingAddress;
import com.krisztavasas.db_library.valueobject.UserAddress;
import com.krisztavasas.db_library.valueobject.PaymentInfo;
import com.krisztavasas.db_library.valueobject.UserPreferences;
import com.krisztavasas.db_library.valueobject.BookMetadata;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for converting between value objects (entity layer) and DTOs (API layer).
 * Value objects use snake_case field names matching the database JSON structure.
 * DTOs use camelCase for Java conventions.
 */
@Mapper(componentModel = "spring")
public interface ValueObjectMapper {

    // ========== Address Mappings ==========

    /**
     * Convert ShippingAddress value object to AddressDto.
     */
    AddressDto toDto(ShippingAddress address);

    /**
     * Convert AddressDto to ShippingAddress value object.
     */
    ShippingAddress toShippingAddress(AddressDto dto);

    /**
     * Convert UserAddress value object to AddressDto.
     * Note: type and isDefault fields are not included in AddressDto.
     */
    AddressDto toDto(UserAddress address);

    /**
     * Convert AddressDto to UserAddress value object.
     * Sets type to null and isDefault to false by default.
     */
    @Mapping(target = "type", constant = "billing")
    @Mapping(target = "isDefault", constant = "false")
    UserAddress toUserAddress(AddressDto dto);

    /**
     * Convert list of UserAddress value objects to list of AddressDtos.
     */
    List<AddressDto> addressListToDto(List<UserAddress> addresses);

    /**
     * Convert list of AddressDtos to list of UserAddress value objects.
     */
    List<UserAddress> dtoToAddressList(List<AddressDto> dtos);

    // ========== Payment Info Mappings ==========

    /**
     * Convert PaymentInfo value object to PaymentInfoDto.
     */
    PaymentInfoDto toDto(PaymentInfo paymentInfo);

    /**
     * Convert PaymentInfoDto to PaymentInfo value object.
     */
    PaymentInfo toValueObject(PaymentInfoDto dto);

    // ========== User Preferences Mappings ==========

    /**
     * Convert UserPreferences value object to PreferencesDto.
     */
    PreferencesDto toDto(UserPreferences preferences);

    /**
     * Convert PreferencesDto to UserPreferences value object.
     */
    UserPreferences toValueObject(PreferencesDto dto);

    // ========== Book Metadata Mappings ==========

    /**
     * Convert BookMetadata value object to BookMetadataDto.
     * Only includes a subset of fields for API responses.
     */
    BookMetadataDto toDto(BookMetadata metadata);

    /**
     * Convert BookMetadataDto to BookMetadata value object.
     * Fields not in DTO will be null in the value object.
     */
    BookMetadata toValueObject(BookMetadataDto dto);
}
