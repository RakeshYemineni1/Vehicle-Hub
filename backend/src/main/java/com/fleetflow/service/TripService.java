package com.fleetflow.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fleetflow.dto.TripRequestDTO;
import com.fleetflow.dto.TripResponseDTO;
import com.fleetflow.entity.Driver;
import com.fleetflow.entity.DriverStatus;
import com.fleetflow.entity.Trip;
import com.fleetflow.entity.TripStatus;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.entity.VehicleStatus;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.DriverRepository;
import com.fleetflow.repository.TripRepository;
import com.fleetflow.repository.VehicleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    // CREATE TRIP (Main Business Logic)
    @Transactional
    public TripResponseDTO createTrip(TripRequestDTO request) {

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Vehicle not found with id: " + request.getVehicleId())
                );

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found with id: " + request.getDriverId())
                );

        // BUSINESS RULES

        if (vehicle.getStatus() != VehicleStatus.AVAILABLE) {
            throw new RuntimeException("Vehicle is not available for trip");
        }

        if (driver.getStatus() != DriverStatus.ON_DUTY) {
            throw new RuntimeException("Driver is not available for trip");
        }

        if (driver.getLicenseExpiryDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Driver license has expired");
        }

        if (request.getCargoWeight() > vehicle.getMaxCapacity()) {
            throw new RuntimeException("Cargo weight exceeds vehicle capacity");
        }

        // UPDATE STATES
        vehicle.setStatus(VehicleStatus.ON_TRIP);
        driver.setStatus(DriverStatus.ON_TRIP);

        // CREATE TRIP
        Trip trip = Trip.builder()
                .origin(request.getOrigin())
                .destination(request.getDestination())
                .cargoWeight(request.getCargoWeight())
                .vehicle(vehicle)
                .driver(driver)
                .status(TripStatus.ACTIVE)
                .build();

        Trip saved = tripRepository.save(trip);

        return mapToResponseDTO(saved);
    }

    // COMPLETE TRIP
    @Transactional
    public TripResponseDTO completeTrip(Long tripId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Trip not found with id: " + tripId)
                );

        if (trip.getStatus() != TripStatus.ACTIVE) {
            throw new RuntimeException("Only active trips can be completed");
        }

        trip.setStatus(TripStatus.COMPLETED);
        trip.setEndTime(java.time.LocalDateTime.now());

        // RESET VEHICLE + DRIVER
        trip.getVehicle().setStatus(VehicleStatus.AVAILABLE);
        trip.getDriver().setStatus(DriverStatus.ON_DUTY);

        return mapToResponseDTO(trip);
    }

    // GET ALL TRIPS
    public List<TripResponseDTO> getAllTrips() {
        return tripRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // ENTITY -> DTO
    private TripResponseDTO mapToResponseDTO(Trip trip) {
        return TripResponseDTO.builder()
                .id(trip.getId())
                .origin(trip.getOrigin())
                .destination(trip.getDestination())
                .cargoWeight(trip.getCargoWeight())
                .vehicleId(trip.getVehicle().getId())
                .driverId(trip.getDriver().getId())
                .status(trip.getStatus())
                .startTime(trip.getStartTime())
                .endTime(trip.getEndTime())
                .build();
    }
}