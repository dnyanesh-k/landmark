package com.landmark.properties.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface PropertyMapper {

     Property toEntity(PropertyRequestDTO propertyRequestDTO);
     PropertyResponseDTO toDTO(Property property);
}
