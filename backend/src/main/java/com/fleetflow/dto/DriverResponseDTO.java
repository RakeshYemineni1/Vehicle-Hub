package com.fleetflow.dto;

import com.fleetflow.entity.DriverStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class DriverResponseDTO {

    private Long id;
    private String name;
    private String licenseNumber;
    private String licenseCategory;
    private LocalDate licenseExpiryDate;
    private DriverStatus status;
    private Double safetyScore;
    private LocalDateTime createdAt;
}