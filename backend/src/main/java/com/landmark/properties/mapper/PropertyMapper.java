package com.landmark.properties.mapper;

import org.mapstruct.Mapper;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

     Property toEntity(PropertyRequestDTO propertyRequestDTO);
     PropertyResponseDTO toDTO(Property property);
}
