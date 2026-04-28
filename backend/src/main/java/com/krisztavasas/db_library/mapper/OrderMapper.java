package com.krisztavasas.db_library.mapper;

import com.krisztavasas.db_library.dto.order.OrderDetailDto;
import com.krisztavasas.db_library.dto.order.OrderDto;
import com.krisztavasas.db_library.dto.order.OrderItemDto;
import com.krisztavasas.db_library.entity.Order;
import com.krisztavasas.db_library.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {UserMapper.class, BookMapper.class, ValueObjectMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface OrderMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userEmail", source = "user.email")
    @Mapping(target = "customerName", expression = "java(order.getUser().getFirstName() + \" \" + order.getUser().getLastName())")
    @Mapping(target = "itemCount", expression = "java(order.getItems() != null ? order.getItems().size() : 0)")
    OrderDto toDto(Order order);

    @Mapping(target = "shippingAddress", source = "shippingAddress")
    @Mapping(target = "paymentInfo", source = "paymentInfo")
    OrderDetailDto toDetailDto(Order order);

    @Mapping(target = "priceAtOrder", source = "unitPrice")
    OrderItemDto toItemDto(OrderItem orderItem);
}
