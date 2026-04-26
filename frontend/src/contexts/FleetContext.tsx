import React, { createContext, useContext, useState } from 'react';

export type VehicleStatus = 'Available' | 'On Trip' | 'In Shop' | 'Retired';
export type DriverStatus = 'On Duty' | 'Off Duty' | 'On Trip';
export type LicenseStatus = 'Valid' | 'Expired';
export type TripStatus = 'Active' | 'Completed';

export interface Vehicle {
    id: string;
    name: string;
    plate: string;
    capacity: string;
    capacityTons: number; // For validation
    odometer: number;
    cost: number;
    status: VehicleStatus;
}

export interface Driver {
    id: string;
    name: string;
    status: DriverStatus;
    licenseStatus: LicenseStatus;
}

export interface Trip {
    id: string;
    vehicleId: string;
    driverId: string;
    cargoWeight: number;
    source: string;
    destination: string;
    expectedDate: string;
    status: TripStatus;
}

export interface MaintenanceLog {
    id: string;
    vehicleId: string;
    serviceType: string;
    cost: number;
    date: string;
    notes: string;
}

interface FleetContextType {
    vehicles: Vehicle[];
    drivers: Driver[];
    trips: Trip[];
    maintenanceLogs: MaintenanceLog[];
    addTrip: (trip: Omit<Trip, 'id' | 'status'>) => void;
    updateVehicleStatus: (id: string, status: VehicleStatus) => void;
    completeTrip: (id: string) => void;
    addMaintenanceLog: (log: Omit<MaintenanceLog, 'id'>) => void;
}

const MOCK_VEHICLES: Vehicle[] = [
    { id: 'V-001', name: 'Volvo FH16', plate: 'TX-492-AB', capacity: '44 Tons', capacityTons: 44, odometer: 125430, cost: 145000, status: 'Available' },
    { id: 'V-002', name: 'Mercedes-Benz Actros', plate: 'CA-881-XY', capacity: '40 Tons', capacityTons: 40, odometer: 28400, cost: 160000, status: 'On Trip' },
    { id: 'V-003', name: 'Scania R500', plate: 'NY-334-ZZ', capacity: '38 Tons', capacityTons: 38, odometer: 410200, cost: 135000, status: 'In Shop' },
    { id: 'V-004', name: 'MAN TGX', plate: 'FL-119-QA', capacity: '42 Tons', capacityTons: 42, odometer: 15400, cost: 152000, status: 'On Trip' },
    { id: 'V-005', name: 'DAF XF 480', plate: 'TX-992-MM', capacity: '44 Tons', capacityTons: 44, odometer: 88200, cost: 128000, status: 'Available' },
    { id: 'V-006', name: 'Iveco S-Way', plate: 'NV-445-BB', capacity: '40 Tons', capacityTons: 40, odometer: 32000, cost: 142000, status: 'Available' },
    { id: 'V-007', name: 'Renault T High', plate: 'WA-771-VV', capacity: '40 Tons', capacityTons: 40, odometer: 142000, cost: 130000, status: 'Available' },
    { id: 'V-008', name: 'Volvo FH 460', plate: 'OR-552-KL', capacity: '44 Tons', capacityTons: 44, odometer: 67100, cost: 138000, status: 'In Shop' },
    { id: 'V-009', name: 'Mercedes-Benz Arocs', plate: 'AZ-118-PQ', capacity: '32 Tons', capacityTons: 32, odometer: 512000, cost: 175000, status: 'Retired' },
    { id: 'V-010', name: 'Scania S580', plate: 'ID-883-WQ', capacity: '44 Tons', capacityTons: 44, odometer: 9500, cost: 165000, status: 'On Trip' },
];

const MOCK_DRIVERS: Driver[] = [
    { id: 'D-001', name: 'John Doe', status: 'On Trip', licenseStatus: 'Valid' },
    { id: 'D-002', name: 'Sarah Smith', status: 'On Duty', licenseStatus: 'Valid' },
    { id: 'D-003', name: 'Mike Ross', status: 'Off Duty', licenseStatus: 'Valid' },
    { id: 'D-004', name: 'Jessica Pearson', status: 'On Trip', licenseStatus: 'Valid' },
    { id: 'D-005', name: 'Harvey Specter', status: 'On Duty', licenseStatus: 'Valid' },
    { id: 'D-006', name: 'Louis Litt', status: 'On Duty', licenseStatus: 'Expired' },
    { id: 'D-007', name: 'Donna Paulsen', status: 'On Duty', licenseStatus: 'Valid' },
    { id: 'D-008', name: 'Rachel Zane', status: 'On Trip', licenseStatus: 'Valid' },
];

const MOCK_TRIPS: Trip[] = [
    { id: 'T-1042', vehicleId: 'V-002', driverId: 'D-001', cargoWeight: 38, source: 'Dallas, TX', destination: 'Chicago, IL', expectedDate: '2026-02-23', status: 'Active' },
    { id: 'T-1041', vehicleId: 'V-006', driverId: 'D-002', cargoWeight: 35, source: 'Los Angeles, CA', destination: 'Detroit, MI', expectedDate: '2026-02-21', status: 'Completed' },
    { id: 'T-1040', vehicleId: 'V-004', driverId: 'D-004', cargoWeight: 40, source: 'Miami, FL', destination: 'Atlanta, GA', expectedDate: '2026-02-22', status: 'Active' },
    { id: 'T-1039', vehicleId: 'V-010', driverId: 'D-008', cargoWeight: 42, source: 'Seattle, WA', destination: 'Austin, TX', expectedDate: '2026-02-24', status: 'Active' },
];

const MOCK_MAINTENANCE: MaintenanceLog[] = [
    { id: 'M-100', vehicleId: 'V-003', serviceType: 'Engine Overhaul', cost: 5000, date: '2026-02-18', notes: 'Routine after 400k miles' },
    { id: 'M-101', vehicleId: 'V-008', serviceType: 'Brake Replacement', cost: 1200, date: '2026-02-20', notes: 'Rear pads and rotors' }
];

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: React.ReactNode }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
    const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
    const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
    const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>(MOCK_MAINTENANCE);

    const addTrip = (tripData: Omit<Trip, 'id' | 'status'>) => {
        const newTrip: Trip = {
            ...tripData,
            id: `T-${1000 + trips.length + 10}`, // simple mock id
            status: 'Active',
        };

        setTrips([newTrip, ...trips]);

        // Update Vehicle
        setVehicles(prev => prev.map(v => v.id === tripData.vehicleId ? { ...v, status: 'On Trip' } : v));

        // Update Driver
        setDrivers(prev => prev.map(d => d.id === tripData.driverId ? { ...d, status: 'On Trip' } : d));
    };

    const updateVehicleStatus = (id: string, status: VehicleStatus) => {
        setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    };

    const completeTrip = (id: string) => {
        const trip = trips.find(t => t.id === id);
        if (!trip) return;

        setTrips(prev => prev.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
        setVehicles(prev => prev.map(v => v.id === trip.vehicleId ? { ...v, status: 'Available' } : v));
        setDrivers(prev => prev.map(d => d.id === trip.driverId ? { ...d, status: 'On Duty' } : d));
    };

    const addMaintenanceLog = (logData: Omit<MaintenanceLog, 'id'>) => {
        const newLog: MaintenanceLog = {
            ...logData,
            id: `M-${100 + maintenanceLogs.length + 5}`
        };
        setMaintenanceLogs([newLog, ...maintenanceLogs]);

        // Update vehicle status
        setVehicles(prev => prev.map(v => v.id === logData.vehicleId ? { ...v, status: 'In Shop' } : v));
    };

    return (
        <FleetContext.Provider value={{ vehicles, drivers, trips, maintenanceLogs, addTrip, updateVehicleStatus, completeTrip, addMaintenanceLog }}>
            {children}
        </FleetContext.Provider>
    );
}

export function useFleet() {
    const context = useContext(FleetContext);
    if (context === undefined) {
        throw new Error('useFleet must be used within a FleetProvider');
    }
    return context;
}
