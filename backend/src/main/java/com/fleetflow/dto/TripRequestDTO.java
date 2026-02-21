package com.fleetflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TripRequestDTO {

    @NotBlank
    private String origin;

    @NotBlank
    private String destination;

    @NotNull
    @Positive
    private Double cargoWeight;

    @NotNull
    private Long vehicleId;

    @NotNull
    private Long driverId;
}