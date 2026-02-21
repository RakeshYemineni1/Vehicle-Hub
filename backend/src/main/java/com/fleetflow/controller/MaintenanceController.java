package com.fleetflow.controller;

import com.fleetflow.entity.Maintenance;
import com.fleetflow.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    // Fleet Manager schedules maintenance
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    @PostMapping("/schedule/{vehicleId}")
    public Maintenance scheduleMaintenance(
            @PathVariable Long vehicleId,
            @RequestParam String description,
            @RequestParam double cost
    ) {
        return maintenanceService.scheduleMaintenance(vehicleId, description, cost);
    }

    // Fleet Manager starts maintenance
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    @PatchMapping("/start/{maintenanceId}")
    public Maintenance startMaintenance(@PathVariable Long maintenanceId) {
        return maintenanceService.startMaintenance(maintenanceId);
    }

    // Fleet Manager completes maintenance
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    @PatchMapping("/complete/{maintenanceId}")
    public Maintenance completeMaintenance(@PathVariable Long maintenanceId) {
        return maintenanceService.completeMaintenance(maintenanceId);
    }

    // Any authenticated user can view maintenance of vehicle
    @GetMapping("/vehicle/{vehicleId}")
    public List<Maintenance> getVehicleMaintenance(@PathVariable Long vehicleId) {
        return maintenanceService.getVehicleMaintenance(vehicleId);
    }
}