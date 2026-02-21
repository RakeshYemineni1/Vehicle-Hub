package com.fleetflow.repository;

import com.fleetflow.entity.Maintenance;
import com.fleetflow.entity.MaintenanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    List<Maintenance> findByVehicleId(Long vehicleId);

    List<Maintenance> findByStatus(MaintenanceStatus status);
}