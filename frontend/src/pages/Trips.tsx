import { useState } from 'react';
import { useFleet } from '@/contexts/FleetContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Truck, Package, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Trips() {
    const { vehicles, drivers, trips, addTrip, completeTrip } = useFleet();

    const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [cargoWeight, setCargoWeight] = useState<number | ''>('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [expectedDate, setExpectedDate] = useState('');

    // Dropdown options
    const availableVehicles = vehicles.filter(v => v.status === 'Available');
    const availableDrivers = drivers.filter(d => d.status === 'On Duty');

    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    const isOverweight = selectedVehicle && cargoWeight && Number(cargoWeight) > selectedVehicle.capacityTons;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isOverweight) {
            toast.error('Cargo weight exceeds vehicle capacity!');
            return;
        }

        if (!vehicleId || !driverId || !cargoWeight || !source || !destination || !expectedDate) {
            toast.error('Please fill in all required fields.');
            return;
        }

        // Check if the selected driver is valid (just a safeguard)
        const selectedDriver = drivers.find(d => d.id === driverId);
        if (selectedDriver?.licenseStatus === 'Expired') {
            toast.error('Cannot assign a driver with an expired license.');
            return;
        }

        addTrip({
            vehicleId,
            driverId,
            cargoWeight: Number(cargoWeight),
            source,
            destination,
            expectedDate
        });

        toast.success('Trip successfully created and assigned!');

        // Reset form
        setVehicleId('');
        setDriverId('');
        setCargoWeight('');
        setSource('');
        setDestination('');
        setExpectedDate('');
    };

    const activeTrips = trips.filter(t => t.status === 'Active');
    const completedTrips = trips.filter(t => t.status === 'Completed');

    const getVehicleData = (id: string) => vehicles.find(v => v.id === id);
    const getDriverData = (id: string) => drivers.find(d => d.id === id);

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Trip Management</h1>
                <p className="text-slate-400 mt-2 text-lg font-medium">Dispatch vehicles, assign drivers, and monitor active routes.</p>
            </div>

            {/* Trip Creation Form */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" /> Create New Trip
                    </CardTitle>
                    <CardDescription className="text-slate-400">Assign an available vehicle and duty driver to a new route.</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Vehicle Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Vehicle <span className="text-slate-500 text-xs font-normal">(Available only)</span></label>
                                <Select value={vehicleId} onValueChange={setVehicleId}>
                                    <SelectTrigger className={cn("bg-white/5 border-white/10 focus:bg-white/10 transition-all text-white", !vehicleId && "text-slate-500")}>
                                        <SelectValue placeholder="Select Vehicle" />
                                    </SelectTrigger>
                                    <SelectContent className="border-white/10 bg-slate-900 text-slate-300">
                                        {availableVehicles.length === 0 ? (
                                            <SelectItem value="none" disabled>No vehicles available</SelectItem>
                                        ) : (
                                            availableVehicles.map(v => (
                                                <SelectItem key={v.id} value={v.id} className="hover:bg-white/10 focus:bg-white/10 focus:text-white">
                                                    {v.plate} - {v.name} ({v.capacity})
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Driver Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Driver <span className="text-slate-500 text-xs font-normal">(On Duty only)</span></label>
                                <TooltipProvider>
                                    <Select value={driverId} onValueChange={setDriverId}>
                                        <SelectTrigger className={cn("bg-white/5 border-white/10 focus:bg-white/10 transition-all text-white", !driverId && "text-slate-500")}>
                                            <SelectValue placeholder="Select Driver" />
                                        </SelectTrigger>
                                        <SelectContent className="border-white/10 bg-slate-900 text-slate-300">
                                            {availableDrivers.length === 0 ? (
                                                <SelectItem value="none" disabled>No drivers available</SelectItem>
                                            ) : (
                                                availableDrivers.map(d => (
                                                    d.licenseStatus === 'Expired' ? (
                                                        <Tooltip key={d.id}>
                                                            <TooltipTrigger asChild>
                                                                <div className="px-2 py-1.5 text-sm text-slate-500 cursor-not-allowed flex items-center justify-between">
                                                                    <span>{d.name} <Badge variant="outline" className="ml-2 text-[10px] text-red-400 border-red-500/30 bg-red-500/10">Expired</Badge></span>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="right" className="bg-slate-800 border-white/10 text-white shadow-xl">
                                                                <p>License Expired. Assignment blocked.</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ) : (
                                                        <SelectItem key={d.id} value={d.id} className="hover:bg-white/10 focus:bg-white/10 focus:text-white">
                                                            {d.name}
                                                        </SelectItem>
                                                    )
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </TooltipProvider>
                            </div>

                            {/* Cargo Weight */}
                            <div className="space-y-3 relative group">
                                <label className="text-sm font-medium text-slate-300">Cargo Weight (Tons)</label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type="number"
                                        value={cargoWeight}
                                        onChange={e => setCargoWeight(e.target.value ? Number(e.target.value) : '')}
                                        className={cn(
                                            "pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-blue-500/50 transition-all",
                                            isOverweight && "border-red-500/50 focus:border-red-500/50 text-red-400 bg-red-500/5"
                                        )}
                                        placeholder="e.g. 25"
                                    />
                                </div>
                                {isOverweight && (
                                    <p className="text-xs text-red-400 font-medium absolute -bottom-5 left-0 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Exceeds max capacity ({selectedVehicle.capacityTons}t)
                                    </p>
                                )}
                            </div>

                            {/* Source */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Source</label>
                                <Input
                                    value={source}
                                    onChange={e => setSource(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-blue-500/50 transition-all"
                                    placeholder="e.g. Houston, TX"
                                />
                            </div>

                            {/* Destination */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Destination</label>
                                <Input
                                    value={destination}
                                    onChange={e => setDestination(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-blue-500/50 transition-all"
                                    placeholder="e.g. Dallas, TX"
                                />
                            </div>

                            {/* Expected Delivery Date */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Expected Delivery</label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        value={expectedDate}
                                        onChange={e => setExpectedDate(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500/50 transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert-[0.6] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end pt-6 border-t border-white/10">
                            <Button type="submit" disabled={isOverweight ? true : false} className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] px-8 font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100">
                                Dispatch Trip
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Tables Section */}
            <div className="grid gap-8">

                {/* Active Trips */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                    <CardHeader className="bg-white/5 border-b border-white/10 pb-4">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Truck className="w-5 h-5 text-blue-400" /> Active Trips
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="w-[100px] font-bold text-slate-300">Trip ID</TableHead>
                                    <TableHead className="font-bold text-slate-300">Vehicle (Plate)</TableHead>
                                    <TableHead className="font-bold text-slate-300">Driver</TableHead>
                                    <TableHead className="font-bold text-slate-300">Route</TableHead>
                                    <TableHead className="font-bold text-slate-300 text-center">Load</TableHead>
                                    <TableHead className="font-bold text-slate-300 text-center">ETA</TableHead>
                                    <TableHead className="text-right font-bold text-slate-300">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeTrips.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-slate-500 font-medium border-none">No active trips currently in transit.</TableCell>
                                    </TableRow>
                                ) : activeTrips.map((trip) => {
                                    const v = getVehicleData(trip.vehicleId);
                                    const d = getDriverData(trip.driverId);
                                    return (
                                        <TableRow key={trip.id} className="hover:bg-white/5 transition-colors border-white/10">
                                            <TableCell className="font-mono text-sm font-bold text-blue-400">{trip.id}</TableCell>
                                            <TableCell className="font-medium text-white">{v?.name} <span className="text-slate-400 font-normal ml-1">({v?.plate})</span></TableCell>
                                            <TableCell className="text-slate-300">{d?.name}</TableCell>
                                            <TableCell className="text-slate-300">
                                                <div className="flex flex-col gap-0.5 text-xs">
                                                    <span className="font-semibold text-slate-300">{trip.source}</span>
                                                    <span className="text-slate-500">to {trip.destination}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-medium text-slate-300">{trip.cargoWeight}t</TableCell>
                                            <TableCell className="text-center text-slate-400">{trip.expectedDate}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        completeTrip(trip.id);
                                                        toast.success(`Trip ${trip.id} marked as completed! Vehicle & Driver released.`);
                                                    }}
                                                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 bg-emerald-500/10 transition-colors shadow-sm"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Complete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Completed Trips */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden opacity-70 transition-opacity hover:opacity-100">
                    <CardHeader className="bg-white/5 border-b border-white/10 pb-4">
                        <CardTitle className="text-xl font-bold text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500/70" /> Completed Trips
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="w-[100px] font-bold text-slate-400">Trip ID</TableHead>
                                    <TableHead className="font-bold text-slate-400">Vehicle (Plate)</TableHead>
                                    <TableHead className="font-bold text-slate-400">Driver</TableHead>
                                    <TableHead className="font-bold text-slate-400">Route</TableHead>
                                    <TableHead className="font-bold text-slate-400 text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {completedTrips.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-slate-500 border-none font-medium">No completed trips in the system.</TableCell>
                                    </TableRow>
                                ) : completedTrips.map((trip) => {
                                    const v = getVehicleData(trip.vehicleId);
                                    const d = getDriverData(trip.driverId);
                                    return (
                                        <TableRow key={trip.id} className="hover:bg-white/5 transition-colors border-white/10 opacity-70">
                                            <TableCell className="font-mono text-sm font-semibold text-slate-500">{trip.id}</TableCell>
                                            <TableCell className="font-medium text-slate-400">{v?.name} <span className="text-slate-600 font-normal ml-1">({v?.plate})</span></TableCell>
                                            <TableCell className="text-slate-400">{d?.name}</TableCell>
                                            <TableCell className="text-slate-400">
                                                {trip.source} → {trip.destination}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className="bg-emerald-500/10 text-emerald-500/70 hover:bg-emerald-500/10 border-emerald-500/20 shadow-none px-3 py-1 font-bold">Completed</Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
