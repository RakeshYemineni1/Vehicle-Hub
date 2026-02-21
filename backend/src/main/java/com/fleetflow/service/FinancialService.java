package com.fleetflow.service;

import com.fleetflow.entity.Maintenance;
import com.fleetflow.entity.Trip;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.repository.MaintenanceRepository;
import com.fleetflow.repository.TripRepository;
import com.fleetflow.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FinancialService {

    private final VehicleRepository vehicleRepository;
    private final TripRepository tripRepository;
    private final MaintenanceRepository maintenanceRepository;

    public double getTotalMaintenanceCost(Long vehicleId) {
        List<Maintenance> maintenanceList =
                maintenanceRepository.findByVehicleId(vehicleId);

        return maintenanceList.stream()
                .mapToDouble(Maintenance::getCost)
                .sum();
    }

    public double getTotalRevenue(Long vehicleId) {
        List<Trip> trips =
                tripRepository.findByVehicleId(vehicleId);

        return trips.stream()
                .mapToDouble(Trip::getRevenue)
                .sum();
    }

    public double calculateROI(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found"));

        double revenue = getTotalRevenue(vehicleId);
        double maintenanceCost = getTotalMaintenanceCost(vehicleId);
        double acquisitionCost = vehicle.getAcquisitionCost();

        if (acquisitionCost == 0) return 0;

        return (revenue - maintenanceCost) / acquisitionCost;
    }

    public double calculateCostPerKm(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found"));

        double maintenanceCost = getTotalMaintenanceCost(vehicleId);
        double totalKm = vehicle.getCurrentOdometer();

        if (totalKm == 0) return 0;

        return maintenanceCost / totalKm;
    }
}