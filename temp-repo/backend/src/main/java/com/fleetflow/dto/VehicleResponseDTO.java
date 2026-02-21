package com.fleetflow.dto;

import java.time.LocalDateTime;

import com.fleetflow.entity.VehicleStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleResponseDTO {

    private Long id;
    private String name;
    private String licensePlate;
    private Double maxCapacity;
    private Double acquisitionCost;
    private Double currentOdometer;
    private VehicleStatus status;
    private LocalDateTime createdAt;
}