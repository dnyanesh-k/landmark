package com.landmark.properties.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PropertyResponseDTO {

    private Long id;
    private String title;
    private String description;
    private Long price;
    private Long areaSqFt;
    private String city;
    private String address;
    private String plotNumber;
    private String surveyNumber;
    private Long sellerId;
    private LocalDateTime createdAt;
}