package com.fleetflow.controller;

import com.fleetflow.dto.TripRequestDTO;
import com.fleetflow.dto.TripResponseDTO;
import com.fleetflow.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    // CREATE TRIP → Fleet + Dispatcher
    @PostMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER')")
    public TripResponseDTO createTrip(
            @Valid @RequestBody TripRequestDTO request) {
        return tripService.createTrip(request);
    }

    // COMPLETE TRIP → Fleet + Dispatcher
    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER','DISPATCHER')")
    public TripResponseDTO completeTrip(@PathVariable Long id) {
        return tripService.completeTrip(id);
    }

    // VIEW ALL TRIPS → Any authenticated user
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<TripResponseDTO> getAllTrips() {
        return tripService.getAllTrips();
    }
}