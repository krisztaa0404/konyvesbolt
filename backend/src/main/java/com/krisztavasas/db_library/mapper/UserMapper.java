package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.user.UpdateUserDto;
import com.krisztavasas.db_library.dto.user.UserDto;
import com.krisztavasas.db_library.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {ValueObjectMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper {

    @Mapping(target = "addressData", source = "addressData")
    @Mapping(target = "preferences", source = "preferences")
    UserDto toDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", ignore = true)
    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "isLoyaltyMember", ignore = true)
    @Mapping(target = "loyaltyDiscountPercent", ignore = true)
    @Mapping(target = "totalSpent", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "addressData", source = "addressData")
    @Mapping(target = "preferences", source = "preferences")
    void updateEntity(UpdateUserDto dto, @MappingTarget User user);
}
