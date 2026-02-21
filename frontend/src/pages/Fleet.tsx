import { useState } from 'react';
import { Truck, Plus, Search, MoreHorizontal, Edit, Trash2, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFleet } from '@/contexts/FleetContext';
import type { VehicleStatus } from '@/contexts/FleetContext';
import { toast } from 'sonner';
export default function Fleet() {
    const { vehicles, updateVehicleStatus } = useFleet();

    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Pagination mocks
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredVehicles = vehicles.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.plate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedVehicles = filteredVehicles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

    const getStatusBadge = (status: VehicleStatus) => {
        switch (status) {
            case 'Available': return <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">Available</Badge>;
            case 'On Trip': return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">On Trip</Badge>;
            case 'In Shop': return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">In Shop</Badge>;
            case 'Retired': return <Badge className="bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 border border-slate-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">Retired</Badge>;
            default: return null;
        }
    };

    const handleStatusChange = (id: string, newStatus: VehicleStatus) => {
        updateVehicleStatus(id, newStatus);
        toast.success(`Vehicle status updated to ${newStatus}`);
    };

    const handleDelete = (id: string) => {
        toast.error(`Delete action mocked for vehicle ${id}.`);
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Vehicle Registry</h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">Manage and track your entire enterprise fleet.</p>
                </div>

                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white font-semibold gap-2 transition-all hover:scale-105 active:scale-95">
                            <Plus className="w-4 h-4" /> Add Vehicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] border-white/10 bg-[#0f172a] text-slate-100 shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">Register New Vehicle</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Add a new asset to the fleet registry. Fill in all required details.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium text-slate-300">Model</label>
                                <Input placeholder="e.g. Volvo FH16" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium text-slate-300">Plate</label>
                                <Input placeholder="e.g. TX-123-AB" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium text-slate-300">Capacity</label>
                                <Input placeholder="e.g. 40 Tons" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium text-slate-300">Cost ($)</label>
                                <Input type="number" placeholder="150000" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">Cancel</Button>
                            <Button onClick={() => setIsAddModalOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-colors">Save Vehicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-400" /> Fleet Assets
                    </CardTitle>
                    <div className="flex items-center gap-3">
                        <div className="relative max-w-sm w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                placeholder="Search model or plate..."
                                className="pl-9 bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-500/50 transition-all w-[250px] text-white placeholder:text-slate-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="w-[80px] font-bold text-slate-300">ID</TableHead>
                                <TableHead className="font-bold text-slate-300 cursor-pointer hover:text-blue-400 transition-colors">
                                    <div className="flex items-center gap-1">Model <ArrowUpDown className="w-3 h-3" /></div>
                                </TableHead>
                                <TableHead className="font-bold text-slate-300">License Plate</TableHead>
                                <TableHead className="font-bold text-slate-300 text-center">Max Capacity</TableHead>
                                <TableHead className="font-bold text-slate-300 text-right">Odometer</TableHead>
                                <TableHead className="font-bold text-slate-300 text-right">Acq. Cost</TableHead>
                                <TableHead className="font-bold text-slate-300 text-center">Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedVehicles.map((vehicle) => (
                                <TableRow key={vehicle.id} className="hover:bg-white/5 transition-colors border-white/10 group">
                                    <TableCell className="font-mono text-sm font-bold text-blue-400">{vehicle.id}</TableCell>
                                    <TableCell className="font-semibold text-white group-hover:text-blue-200 transition-colors">{vehicle.name}</TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-slate-300">
                                            {vehicle.plate}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-slate-300 font-medium">{vehicle.capacity}</TableCell>
                                    <TableCell className="text-right text-slate-300 font-medium">
                                        {vehicle.odometer.toLocaleString()} <span className="text-xs text-slate-500">mi</span>
                                    </TableCell>
                                    <TableCell className="text-right text-slate-300 font-medium">
                                        ${vehicle.cost.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(vehicle.status)}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-white/10">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 border-white/10 bg-slate-900 text-slate-300">
                                                <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white">
                                                    <Edit className="w-4 h-4 text-slate-400" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuLabel className="text-xs text-slate-500">Change Status</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-emerald-400 focus:bg-white/10 focus:text-emerald-400" onClick={() => handleStatusChange(vehicle.id, 'Available')}>
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_5px_rgba(16,185,129,0.8)]" /> Available
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-amber-400 focus:bg-white/10 focus:text-amber-400" onClick={() => handleStatusChange(vehicle.id, 'On Trip')}>
                                                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 shadow-[0_0_5px_rgba(245,158,11,0.8)]" /> On Trip
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-red-400 focus:bg-white/10 focus:text-red-400" onClick={() => handleStatusChange(vehicle.id, 'In Shop')}>
                                                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_5px_rgba(239,68,68,0.8)]" /> In Shop
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-slate-300 focus:bg-white/10 focus:text-slate-300" onClick={() => handleStatusChange(vehicle.id, 'Retired')}>
                                                    <div className="w-2 h-2 rounded-full bg-slate-500 mr-2 shadow-[0_0_5px_rgba(100,116,139,0.8)]" /> Retired
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 gap-2" onClick={() => handleDelete(vehicle.id)}>
                                                    <Trash2 className="w-4 h-4" /> Delete Asset
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {paginatedVehicles.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-32 text-center text-slate-500 font-medium border-none">
                                        No vehicles found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Custom minimal pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/5">
                        <div className="text-sm text-slate-400 font-medium">
                            Showing <span className="font-bold text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-white">{Math.min(currentPage * itemsPerPage, filteredVehicles.length)}</span> of <span className="font-bold text-white">{filteredVehicles.length}</span> entries
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </Button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "default" : "ghost"}
                                    size="sm"
                                    className={currentPage === i + 1 ? "bg-blue-600 hover:bg-blue-500 w-8 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all" : "w-8 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
