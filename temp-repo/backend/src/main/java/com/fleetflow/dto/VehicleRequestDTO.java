package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class VehicleRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String licensePlate;

    @NotNull
    @Positive
    private Double maxCapacity;

    @NotNull
    @Positive
    private Double acquisitionCost;

    @NotNull
    @Positive
    private Double currentOdometer;
}