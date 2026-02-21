package com.fleetflow.controller;

import com.fleetflow.dto.DriverRequestDTO;
import com.fleetflow.dto.DriverResponseDTO;
import com.fleetflow.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // CREATE DRIVER → Fleet Manager only
    @PostMapping
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    public DriverResponseDTO createDriver(
            @Valid @RequestBody DriverRequestDTO request) {
        return driverService.createDriver(request);
    }

    // VIEW ALL → Fleet, Dispatcher, Safety
    @GetMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER','SAFETY_OFFICER')")
    public List<DriverResponseDTO> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    // VIEW BY ID → Fleet, Dispatcher, Safety
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER','SAFETY_OFFICER')")
    public DriverResponseDTO getDriverById(@PathVariable Long id) {
        return driverService.getDriverById(id);
    }

    // SUSPEND DRIVER → Fleet + Safety
    @PatchMapping("/{id}/suspend")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','SAFETY_OFFICER')")
    public DriverResponseDTO suspendDriver(@PathVariable Long id) {
        return driverService.suspendDriver(id);
    }

    // DELETE DRIVER → Fleet Manager only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('FLEET_MANAGER')")
    public void deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
    }
}