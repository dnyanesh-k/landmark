package com.landmark.properties.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;
import com.landmark.properties.exception.PropertyNotFoundException;
import com.landmark.properties.exception.ResourceNotFoundException;
import com.landmark.properties.mapper.PropertyMapper;
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
    private final PropertyMapper propertyMapper;

    @Override
    @Transactional
    public PropertyResponseDTO createProperty(PropertyRequestDTO requestDTO) {

        User seller = userRepository.findById(requestDTO.getSellerId())
                .orElseThrow(() ->
                        new InvalidSellerException("Seller not found with id " + requestDTO.getSellerId()));

        Property property = propertyMapper.toEntity(requestDTO);
        
        property.setSeller(seller);
        System.out.println("PROPERRY TOENTITY ===> " + property);
        Property saved = propertyRepository.save(property);
        System.out.println("SAVED ENTITY: "+ saved);
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
    
    @Override
    public List<PropertyResponseDTO> getPropertiesByCurrentUser() {
        // 1. Get the current logged-in user's identifier (username/phone) from JWT
        String currentUserPhone = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();

        // 2. Find the user in DB
        User seller = userRepository.findByPhoneNumber(currentUserPhone)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // 3. Fetch properties belonging to this seller
        List<Property> properties = propertyRepository.findBySeller(seller);

        // 4. Map to DTOs
        return properties.stream()
                .map(propertyMapper::toDTO)
                .toList();
    }

}