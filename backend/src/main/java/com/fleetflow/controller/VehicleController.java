package com.fleetflow.controller;

import com.fleetflow.dto.VehicleRequestDTO;
import com.fleetflow.dto.VehicleResponseDTO;
import com.fleetflow.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    // CREATE VEHICLE → Fleet Manager only
    @PostMapping
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    public VehicleResponseDTO createVehicle(
            @Valid @RequestBody VehicleRequestDTO request) {
        return vehicleService.createVehicle(request);
    }

    // VIEW ALL → Fleet, Dispatcher, Safety
    @GetMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER','SAFETY_OFFICER')")
    public List<VehicleResponseDTO> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // VIEW BY ID → Fleet, Dispatcher, Safety
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER','SAFETY_OFFICER')")
    public VehicleResponseDTO getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    // RETIRE → Fleet Manager only
    @PatchMapping("/{id}/retire")
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    public VehicleResponseDTO retireVehicle(@PathVariable Long id) {
        return vehicleService.retireVehicle(id);
    }

    // DELETE → Fleet Manager only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }
}