package com.landmark.properties.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.service.PropertyService;
import com.landmark.shared.dto.ApiResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ApiResponseDTO<?> createProperty(
            @Valid @RequestBody PropertyRequestDTO requestDTO) {
    	System.out.println("ADD PROPRTY: "+requestDTO);

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
    
    @GetMapping("/seller")
    public ApiResponseDTO<?> getMyProperties() {
        // The service will extract the current user from SecurityContextHolder
        List<PropertyResponseDTO> myProperties = propertyService.getPropertiesByCurrentUser();

        return ApiResponseDTO.ok(
                myProperties,
                "Your properties fetched successfully",
                HttpStatus.OK.value());
    }

}