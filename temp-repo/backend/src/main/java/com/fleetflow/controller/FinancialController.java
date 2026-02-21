package com.fleetflow.controller;

import com.fleetflow.service.FinancialService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinancialController {

    private final FinancialService financialService;

    // Financial Analyst + Fleet Manager can view financial metrics

    @PreAuthorize("hasAnyRole('FINANCIAL_ANALYST','FLEET_MANAGER')")
    @GetMapping("/maintenance-cost/{vehicleId}")
    public double getMaintenanceCost(@PathVariable Long vehicleId) {
        return financialService.getTotalMaintenanceCost(vehicleId);
    }

    @PreAuthorize("hasAnyRole('FINANCIAL_ANALYST','FLEET_MANAGER')")
    @GetMapping("/revenue/{vehicleId}")
    public double getRevenue(@PathVariable Long vehicleId) {
        return financialService.getTotalRevenue(vehicleId);
    }

    @PreAuthorize("hasAnyRole('FINANCIAL_ANALYST','FLEET_MANAGER')")
    @GetMapping("/roi/{vehicleId}")
    public double getROI(@PathVariable Long vehicleId) {
        return financialService.calculateROI(vehicleId);
    }

    @PreAuthorize("hasAnyRole('FINANCIAL_ANALYST','FLEET_MANAGER')")
    @GetMapping("/cost-per-km/{vehicleId}")
    public double getCostPerKm(@PathVariable Long vehicleId) {
        return financialService.calculateCostPerKm(vehicleId);
    }
}