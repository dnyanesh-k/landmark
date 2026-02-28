package com.landmark.properties.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;
import com.landmark.properties.exception.PropertyNotFoundException;
import com.landmark.properties.exception.InvalidSellerException;
import com.landmark.properties.repository.PropertyRepository;
import com.landmark.user.entity.User;
import com.landmark.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PropertyResponseDTO createProperty(PropertyRequestDTO requestDTO) {

        User seller = userRepository.findById(requestDTO.getSellerId())
                .orElseThrow(() ->
                        new InvalidSellerException("Seller not found with id " + requestDTO.getSellerId()));

        Property property = Property.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .price(requestDTO.getPrice())
                .areaSqFt(requestDTO.getAreaSqFt())
                .city(requestDTO.getCity())
                .address(requestDTO.getAddress())
                .plotNumber(requestDTO.getPlotNumber())
                .surveyNumber(requestDTO.getSurveyNumber())
                .seller(seller)
                .build();

        Property saved = propertyRepository.save(property);

        return mapToDTO(saved);
    }

    @Override
    public List<PropertyResponseDTO> getAllProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyResponseDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new PropertyNotFoundException("Property not found with id " + id));

        return mapToDTO(property);
    }

    @Override
    @Transactional
    public void deleteProperty(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new PropertyNotFoundException("Property not found with id " + id));

        propertyRepository.delete(property);
    }

    private PropertyResponseDTO mapToDTO(Property property) {
        return PropertyResponseDTO.builder()
                .id(property.getId())
                .title(property.getTitle())
                .description(property.getDescription())
                .price(property.getPrice())
                .areaSqFt(property.getAreaSqFt())
                .city(property.getCity())
                .address(property.getAddress())
                .plotNumber(property.getPlotNumber())
                .surveyNumber(property.getSurveyNumber())
                .sellerId(property.getSeller().getUserId())
                .createdAt(property.getCreatedAt())
                .build();
    }
}