package com.fleetflow.service;

import com.fleetflow.dto.DriverRequestDTO;
import com.fleetflow.dto.DriverResponseDTO;
import com.fleetflow.entity.Driver;
import com.fleetflow.entity.DriverStatus;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    // CREATE DRIVER
    public DriverResponseDTO createDriver(DriverRequestDTO request) {

        Driver driver = Driver.builder()
                .name(request.getName())
                .licenseNumber(request.getLicenseNumber())
                .licenseCategory(request.getLicenseCategory())
                .licenseExpiryDate(request.getLicenseExpiryDate())
                .safetyScore(request.getSafetyScore())
                .status(DriverStatus.ON_DUTY)
                .createdAt(LocalDateTime.now())
                .build();

        return mapToDTO(driverRepository.save(driver));
    }

    // GET ALL DRIVERS
    public List<DriverResponseDTO> getAllDrivers() {
        return driverRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET DRIVER BY ID
    public DriverResponseDTO getDriverById(Long id) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found with id: " + id)
                );

        return mapToDTO(driver);
    }

    // SUSPEND DRIVER
    public DriverResponseDTO suspendDriver(Long id) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found with id: " + id)
                );

        driver.setStatus(DriverStatus.SUSPENDED);

        return mapToDTO(driverRepository.save(driver));
    }

    // DELETE DRIVER
    public void deleteDriver(Long id) {

        if (!driverRepository.existsById(id)) {
            throw new ResourceNotFoundException("Driver not found with id: " + id);
        }

        driverRepository.deleteById(id);
    }

    // MAPPER
    private DriverResponseDTO mapToDTO(Driver driver) {

        return DriverResponseDTO.builder()
                .id(driver.getId())
                .name(driver.getName())
                .licenseNumber(driver.getLicenseNumber())
                .licenseCategory(driver.getLicenseCategory())
                .licenseExpiryDate(driver.getLicenseExpiryDate())
                .safetyScore(driver.getSafetyScore())
                .status(driver.getStatus())
                .createdAt(driver.getCreatedAt())
                .build();
    }
}