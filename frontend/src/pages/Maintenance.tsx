import { useState } from 'react';
import { useFleet } from '@/contexts/FleetContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wrench, Calendar, DollarSign, PenTool, ClipboardEdit } from 'lucide-react';
import { toast } from 'sonner';

export default function Maintenance() {
    const { vehicles, maintenanceLogs, addMaintenanceLog } = useFleet();

    const [vehicleId, setVehicleId] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [cost, setCost] = useState<number | ''>('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    // Active vehicles (not retired)
    const availableForService = vehicles.filter(v => v.status !== 'Retired');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!vehicleId || !serviceType || !cost || !date) {
            toast.error('Please fill in all required fields.');
            return;
        }

        addMaintenanceLog({
            vehicleId,
            serviceType,
            cost: Number(cost),
            date,
            notes
        });

        toast.success('Vehicle moved to maintenance');

        // Reset form
        setVehicleId('');
        setServiceType('');
        setCost('');
        setDate('');
        setNotes('');
    };

    const getVehicleName = (id: string) => {
        const v = vehicles.find(v => v.id === id);
        return v ? `${v.name} (${v.plate})` : 'Unknown Vehicle';
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Maintenance Logs</h1>
                <p className="text-slate-400 mt-2 text-lg font-medium">Schedule service and track repair costs across the fleet.</p>
            </div>

            {/* Log Form */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-red-400" /> Log Service
                    </CardTitle>
                    <CardDescription className="text-slate-400">Record repairs or routine maintenance to automatically update vehicle status.</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Vehicle Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Vehicle</label>
                                <Select value={vehicleId} onValueChange={setVehicleId}>
                                    <SelectTrigger className="bg-white/5 border-white/10 focus:bg-white/10 transition-all text-white">
                                        <SelectValue placeholder="Select Vehicle" />
                                    </SelectTrigger>
                                    <SelectContent className="border-white/10 bg-slate-900 text-slate-300">
                                        {availableForService.map(v => (
                                            <SelectItem key={v.id} value={v.id} className="hover:bg-white/10 focus:bg-white/10 focus:text-white">
                                                {v.plate} - {v.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Service Type */}
                            <div className="space-y-3 group">
                                <label className="text-sm font-medium text-slate-300">Service Type</label>
                                <div className="relative">
                                    <PenTool className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                                    <Input
                                        value={serviceType}
                                        onChange={e => setServiceType(e.target.value)}
                                        className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-red-500/50 transition-all"
                                        placeholder="e.g. Engine Overhaul"
                                    />
                                </div>
                            </div>

                            {/* Cost */}
                            <div className="space-y-3 group">
                                <label className="text-sm font-medium text-slate-300">Cost ($)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                                    <Input
                                        type="number"
                                        value={cost}
                                        onChange={e => setCost(e.target.value ? Number(e.target.value) : '')}
                                        className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-red-500/50 transition-all"
                                        placeholder="e.g. 1500"
                                    />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="space-y-3 group">
                                <label className="text-sm font-medium text-slate-300">Service Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-400 z-10 transition-colors pointer-events-none" />
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="pl-9 bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-red-500/50 transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert-[0.6] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-3 lg:col-span-2">
                                <label className="text-sm font-medium text-slate-300">Notes <span className="text-slate-500 text-xs font-normal">(Optional)</span></label>
                                <Input
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-red-500/50 transition-all"
                                    placeholder="Add any additional details about the service..."
                                />
                            </div>

                        </div>

                        <div className="flex justify-end pt-6 border-t border-white/10">
                            <Button type="submit" className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] px-8 font-semibold transition-all hover:scale-105 active:scale-95">
                                <ClipboardEdit className="w-4 h-4 mr-2" /> Log Service
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Service History Table */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/10 pb-4">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-slate-400" /> Service History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="w-[100px] font-bold text-slate-300">Log ID</TableHead>
                                <TableHead className="font-bold text-slate-300">Date</TableHead>
                                <TableHead className="font-bold text-slate-300">Vehicle</TableHead>
                                <TableHead className="font-bold text-slate-300">Service Type</TableHead>
                                <TableHead className="font-bold text-slate-300 text-right">Cost</TableHead>
                                <TableHead className="font-bold text-slate-300 w-[30%]">Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {maintenanceLogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500 font-medium border-none">No maintenance records found.</TableCell>
                                </TableRow>
                            ) : maintenanceLogs.map((log) => (
                                <TableRow key={log.id} className="hover:bg-white/5 transition-colors border-white/10">
                                    <TableCell className="font-mono text-sm font-bold text-red-500">{log.id}</TableCell>
                                    <TableCell className="text-slate-300 font-medium">{log.date}</TableCell>
                                    <TableCell className="font-semibold text-white">{getVehicleName(log.vehicleId)}</TableCell>
                                    <TableCell className="text-slate-300">{log.serviceType}</TableCell>
                                    <TableCell className="text-right text-slate-300 font-medium">${log.cost.toLocaleString()}</TableCell>
                                    <TableCell className="text-slate-400 text-sm truncate max-w-xs">{log.notes || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
