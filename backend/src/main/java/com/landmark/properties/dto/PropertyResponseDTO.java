package com.landmark.properties.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PropertyResponseDTO {

    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Double areaSqFt;
    private String city;
    private String address;
    private String plotNumber;
    private String surveyNumber;
    private Long sellerId;
    private LocalDateTime createdAt;
}