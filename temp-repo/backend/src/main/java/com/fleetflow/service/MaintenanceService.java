package com.fleetflow.service;

import com.fleetflow.entity.*;
import com.fleetflow.repository.MaintenanceRepository;
import com.fleetflow.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final VehicleRepository vehicleRepository;

    @Transactional
    public Maintenance scheduleMaintenance(Long vehicleId, String description, double cost) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        Maintenance maintenance = Maintenance.builder()
                .vehicle(vehicle)
                .description(description)
                .cost(cost)
                .scheduledAt(LocalDateTime.now())
                .status(MaintenanceStatus.SCHEDULED)
                .build();

        return maintenanceRepository.save(maintenance);
    }

    @Transactional
    public Maintenance startMaintenance(Long maintenanceId) {

        Maintenance maintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Maintenance not found"));

        Vehicle vehicle = maintenance.getVehicle();

        vehicle.setStatus(VehicleStatus.IN_SHOP);
        maintenance.setStatus(MaintenanceStatus.IN_PROGRESS);

        return maintenance;
    }

    @Transactional
    public Maintenance completeMaintenance(Long maintenanceId) {

        Maintenance maintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Maintenance not found"));

        Vehicle vehicle = maintenance.getVehicle();

        maintenance.setStatus(MaintenanceStatus.COMPLETED);
        maintenance.setCompletedAt(LocalDateTime.now());

        vehicle.setStatus(VehicleStatus.AVAILABLE);

        return maintenance;
    }

    public List<Maintenance> getVehicleMaintenance(Long vehicleId) {
        return maintenanceRepository.findByVehicleId(vehicleId);
    }
}