package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.discount.CreateSeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.SeasonalDiscountDto;
import com.krisztavasas.db_library.dto.discount.UpdateSeasonalDiscountDto;
import com.krisztavasas.db_library.entity.SeasonalDiscount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/**
 * MapStruct mapper a SeasonalDiscount entitás és DTO-k közötti konverzióhoz.
 */
@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface SeasonalDiscountMapper {

    SeasonalDiscountDto toDto(SeasonalDiscount discount);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "applicableBooks", ignore = true)
    @Mapping(target = "scopeType", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "currentUsageCount", constant = "0")
    @Mapping(target = "minimumOrderAmount", defaultValue = "0")
    SeasonalDiscount toEntity(CreateSeasonalDiscountDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "applicableBooks", ignore = true)
    @Mapping(target = "scopeType", ignore = true)
    @Mapping(target = "currentUsageCount", ignore = true)
    void updateEntity(UpdateSeasonalDiscountDto dto, @MappingTarget SeasonalDiscount discount);
}
