import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShieldAlert, AlertTriangle, AlertCircle, MapPin, Truck, CheckCircle2, SlidersHorizontal, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Incident {
    id: string;
    type: 'Critical' | 'Warning' | 'Low';
    description: string;
    vehicle: string;
    driver: string;
    location: string;
    time: string;
    status: 'Active' | 'Resolved';
}

const MOCK_INCIDENTS: Incident[] = [
    { id: 'INC-9921', type: 'Critical', description: 'Engine Coolant Overheating', vehicle: 'V-003 (Scania R500)', driver: 'Mike Ross', location: 'I-40 West, Mile 142', time: '10:45 AM today', status: 'Active' },
    { id: 'INC-9920', type: 'Warning', description: 'Tire Pressure Loss (Rear Left)', vehicle: 'V-008 (Volvo FH 460)', driver: 'Rachel Zane', location: 'Route 66, Near Flagstaff', time: '08:12 AM today', status: 'Active' },
    { id: 'INC-9919', type: 'Low', description: 'Geofence Exit (Unauthorized)', vehicle: 'V-002 (Mercedes-Benz)', driver: 'John Doe', location: 'Dallas Metro Area', time: 'Yesterday, 4:30 PM', status: 'Resolved' },
    { id: 'INC-9918', type: 'Critical', description: 'Harsh Braking Event (Dashcam Triggered)', vehicle: 'V-004 (MAN TGX)', driver: 'Jessica Pearson', location: 'Atlanta City Hub', time: 'Yesterday, 1:15 PM', status: 'Resolved' },
    { id: 'INC-9917', type: 'Warning', description: 'Missed Checkpoint', vehicle: 'V-010 (Scania S580)', driver: 'Harvey Specter', location: 'Seattle Port', time: 'Yesterday, 8:00 AM', status: 'Resolved' },
];

export default function Incidents() {
    const [searchQuery, setSearchQuery] = useState('');
    const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);

    const handleAcknowledge = (id: string) => {
        setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Resolved' } : inc));
        toast.success(`Incident ${id} acknowledged and marked as resolved.`);
    };

    const handleViewReport = (id: string) => {
        toast.info(`Generating detailed report for ${id}...`);
    };

    const getPriorityBadge = (type: string) => {
        switch (type) {
            case 'Critical': return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)] px-3 py-1 font-bold"><AlertCircle className="w-3 h-3 mr-1" /> Critical</Badge>;
            case 'Warning': return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)] px-3 py-1 font-bold"><AlertTriangle className="w-3 h-3 mr-1" /> Warning</Badge>;
            case 'Low': return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] px-3 py-1 font-bold">Low Priority</Badge>;
            default: return null;
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'Active') {
            return <div className="flex items-center gap-2 text-amber-400 text-sm font-bold"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span> Active</div>;
        }
        return <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold"><CheckCircle2 className="w-4 h-4" /> Resolved</div>;
    };

    const activeCount = incidents.filter(i => i.status === 'Active').length;
    const criticalCount = incidents.filter(i => i.type === 'Critical' && i.status === 'Active').length;

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Command Center <span className="text-red-500">Alerts</span></h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">Real-time incident response and safety monitoring network.</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Active Critical</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">{criticalCount}</div>
                        <p className="text-slate-500 text-sm font-medium mt-2">Requires immediate attention</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Unresolved Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">{activeCount}</div>
                        <p className="text-slate-500 text-sm font-medium mt-2">Across all operating fleet units</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Response Time (Avg)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-extrabold text-white">4.2<span className="text-2xl text-slate-500 ml-1">m</span></div>
                        <p className="text-emerald-400 text-sm font-bold mt-2">-15% from last week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Incident Stream */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-400" /> Live Incident Stream
                    </CardTitle>
                    <div className="flex items-center gap-3">
                        <div className="relative max-w-sm w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-400 transition-colors" />
                            <Input
                                placeholder="Search event logs..."
                                className="pl-9 bg-white/5 border-white/10 focus:bg-white/10 focus:border-red-500/50 transition-all w-[250px] text-white placeholder:text-slate-500"
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
                    <div className="divide-y divide-white/10">
                        {incidents.filter(i => i.description.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase())).map((incident) => (
                            <div key={incident.id} className="p-6 hover:bg-white/5 transition-all group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                {/* Left: Priority & ID */}
                                <div className="md:col-span-2 flex flex-col items-start gap-2">
                                    {getPriorityBadge(incident.type)}
                                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-wider">{incident.id}</span>
                                </div>

                                {/* Center: Details */}
                                <div className="md:col-span-6 space-y-2">
                                    <h3 className="text-lg font-bold text-white tracking-tight">{incident.description}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 font-medium">
                                        <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"><Truck className="w-4 h-4 text-slate-500" /> {incident.vehicle}</div>
                                        <span className="text-slate-600">•</span>
                                        <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"><MapPin className="w-4 h-4 text-slate-500" /> {incident.location}</div>
                                    </div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Reported: {incident.time} by {incident.driver}</div>
                                </div>

                                {/* Right: Status & Action */}
                                <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-6">
                                    {getStatusBadge(incident.status)}
                                    {incident.status === 'Active' ? (
                                        <Button onClick={() => handleAcknowledge(incident.id)} className="bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all font-bold">
                                            Acknowledge
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleViewReport(incident.id)} variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all font-semibold">
                                            <FileText className="w-4 h-4 mr-2" /> View Report
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
