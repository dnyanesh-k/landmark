package com.landmark.properties.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    @NotNull
    private Double areaSqFt;

    @NotBlank
    private String city;

    private String address;

    private String plotNumber;

    private String surveyNumber;

    @NotNull
    private Long sellerId;
}