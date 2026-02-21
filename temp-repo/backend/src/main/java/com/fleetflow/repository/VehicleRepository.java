package com.fleetflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fleetflow.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByLicensePlate(String licensePlate);

    boolean existsByLicensePlate(String licensePlate);
}