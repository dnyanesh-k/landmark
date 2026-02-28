package com.landmark.properties.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.service.PropertyService;
import com.landmark.shared.dto.ApiResponseDTO;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ApiResponseDTO<?> createProperty(
            @Valid @RequestBody PropertyRequestDTO requestDTO) {

        PropertyResponseDTO response = propertyService.createProperty(requestDTO);

        return ApiResponseDTO.ok(
                response,
                "Property created successfully!",
                HttpStatus.CREATED.value());
    }

    @GetMapping
    public ApiResponseDTO<?> getAllProperties() {

        List<PropertyResponseDTO> properties = propertyService.getAllProperties();

        return ApiResponseDTO.ok(
                properties,
                "Properties fetched successfully",
                HttpStatus.OK.value());
    }

    @GetMapping("/{id}")
    public ApiResponseDTO<?> getPropertyById(@PathVariable Long id) {

        PropertyResponseDTO property = propertyService.getPropertyById(id);

        return ApiResponseDTO.ok(
                property,
                "Property fetched successfully",
                HttpStatus.OK.value());
    }

    @DeleteMapping("/{id}")
    public ApiResponseDTO<?> deleteProperty(@PathVariable Long id) {

        propertyService.deleteProperty(id);

        return ApiResponseDTO.ok(
                null,
                "Property deleted successfully",
                HttpStatus.OK.value());
    }
}