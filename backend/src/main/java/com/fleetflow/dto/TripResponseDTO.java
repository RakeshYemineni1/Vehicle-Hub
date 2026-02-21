package com.fleetflow.dto;

import java.time.LocalDateTime;

import com.fleetflow.entity.TripStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TripResponseDTO {

    private Long id;
    private String origin;
    private String destination;
    private Double cargoWeight;

    private Long vehicleId;
    private Long driverId;

    private TripStatus status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}