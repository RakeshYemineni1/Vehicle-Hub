package com.fleetflow.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class DriverRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String licenseNumber;

    @NotBlank
    private String licenseCategory;

    @NotNull
    @Future
    private LocalDate licenseExpiryDate;

    @PositiveOrZero
    private Double safetyScore;
}