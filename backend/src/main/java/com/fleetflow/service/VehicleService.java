package com.fleetflow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fleetflow.dto.VehicleRequestDTO;
import com.fleetflow.dto.VehicleResponseDTO;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.entity.VehicleStatus;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    // CREATE VEHICLE
    public VehicleResponseDTO createVehicle(VehicleRequestDTO request) {

        if (vehicleRepository.existsByLicensePlate(request.getLicensePlate())) {
            throw new RuntimeException("Vehicle with this license plate already exists");
        }

        Vehicle vehicle = Vehicle.builder()
                .name(request.getName())
                .licensePlate(request.getLicensePlate())
                .maxCapacity(request.getMaxCapacity())
                .acquisitionCost(request.getAcquisitionCost())
                .currentOdometer(request.getCurrentOdometer())
                .status(VehicleStatus.AVAILABLE)
                .build();

        Vehicle saved = vehicleRepository.save(vehicle);

        return mapToResponseDTO(saved);
    }

    // GET ALL VEHICLES
    public List<VehicleResponseDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // GET VEHICLE BY ID
    public VehicleResponseDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Vehicle not found with id: " + id)
                );

        return mapToResponseDTO(vehicle);
    }

    // RETIRE VEHICLE
    public VehicleResponseDTO retireVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Vehicle not found with id: " + id)
                );

        vehicle.setStatus(VehicleStatus.RETIRED);

        Vehicle updated = vehicleRepository.save(vehicle);

        return mapToResponseDTO(updated);
    }

    // DELETE VEHICLE
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle not found with id: " + id);
        }

        vehicleRepository.deleteById(id);
    }

    // ENTITY -> RESPONSE DTO MAPPER
    private VehicleResponseDTO mapToResponseDTO(Vehicle vehicle) {
        return VehicleResponseDTO.builder()
                .id(vehicle.getId())
                .name(vehicle.getName())
                .licensePlate(vehicle.getLicensePlate())
                .maxCapacity(vehicle.getMaxCapacity())
                .acquisitionCost(vehicle.getAcquisitionCost())
                .currentOdometer(vehicle.getCurrentOdometer())
                .status(vehicle.getStatus())
                .createdAt(vehicle.getCreatedAt())
                .build();
    }
}