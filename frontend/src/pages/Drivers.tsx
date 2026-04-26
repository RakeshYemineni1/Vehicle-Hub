import { useState } from 'react';
import { useFleet } from '@/contexts/FleetContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Shield, UserX, UserCheck, ShieldAlert, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import type { DriverStatus, LicenseStatus } from '@/contexts/FleetContext';
import { toast } from 'sonner';

export default function Drivers() {
    const { drivers } = useFleet();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredDrivers = drivers.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedDrivers = filteredDrivers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

    const getStatusBadge = (status: DriverStatus) => {
        switch (status) {
            case 'On Duty': return <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">On Duty</Badge>;
            case 'On Trip': return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">On Trip</Badge>;
            case 'Off Duty': return <Badge className="bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 border border-slate-500/30 shadow-sm backdrop-blur-md px-3 py-1 font-bold">Off Duty</Badge>;
            default: return null;
        }
    };

    const getLicenseBadge = (status: LicenseStatus) => {
        if (status === 'Valid') {
            return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm px-3 py-1 font-bold gap-1"><Shield className="w-3 h-3" /> Valid</Badge>;
        }
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm px-3 py-1 font-bold gap-1"><ShieldAlert className="w-3 h-3" /> Expired</Badge>;
    };

    const handleAction = (id: string, action: string) => {
        toast.info(`Mock Action: ${action} for driver ${id}`);
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Driver Registry</h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">Manage and track your operational personnel.</p>
                </div>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" /> Driver Personnel
                    </CardTitle>
                    <div className="flex items-center gap-3">
                        <div className="relative max-w-sm w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                placeholder="Search by name or ID..."
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
                                <TableHead className="w-[100px] font-bold text-slate-300">ID</TableHead>
                                <TableHead className="font-bold text-slate-300 cursor-pointer hover:text-blue-400 transition-colors">
                                    <div className="flex items-center gap-1">Name <ArrowUpDown className="w-3 h-3" /></div>
                                </TableHead>
                                <TableHead className="font-bold text-slate-300 text-center">Status</TableHead>
                                <TableHead className="font-bold text-slate-300 text-center">License</TableHead>
                                <TableHead className="text-right font-bold text-slate-300 w-[150px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedDrivers.map((driver) => (
                                <TableRow key={driver.id} className="hover:bg-white/5 transition-colors border-white/10 group">
                                    <TableCell className="font-mono text-sm font-bold text-blue-400">{driver.id}</TableCell>
                                    <TableCell className="font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50 flex justify-center items-center text-xs font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                            {driver.name.charAt(0)}
                                        </div>
                                        {driver.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(driver.status)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getLicenseBadge(driver.licenseStatus)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10" onClick={() => handleAction(driver.id, 'Approve')}>
                                                <UserCheck className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10" onClick={() => handleAction(driver.id, 'Suspend')}>
                                                <UserX className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {paginatedDrivers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium border-none">
                                        No drivers found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Custom minimal pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/5">
                        <div className="text-sm text-slate-400 font-medium">
                            Showing <span className="font-bold text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-white">{Math.min(currentPage * itemsPerPage, filteredDrivers.length)}</span> of <span className="font-bold text-white">{filteredDrivers.length}</span> entries
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
