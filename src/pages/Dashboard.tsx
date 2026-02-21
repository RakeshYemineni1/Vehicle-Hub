import {
    Truck,
    AlertTriangle,
    Package,
    Percent,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    ChevronRight
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFleet } from '@/contexts/FleetContext';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard() {
    const { vehicles, trips, drivers } = useFleet();

    // KPI Metrics
    const totalVehicles = vehicles.length;
    const maintenanceCount = vehicles.filter(v => v.status === 'In Shop').length;

    const activeTrips = trips.filter(t => t.status === 'Active');
    const pendingCargoTons = activeTrips.reduce((acc, t) => acc + t.cargoWeight, 0);

    const onTripCount = vehicles.filter(v => v.status === 'On Trip').length;
    const utilizationRate = totalVehicles > 0 ? Math.round((onTripCount / totalVehicles) * 100) : 0;

    const availableCount = vehicles.filter(v => v.status === 'Available').length;
    const retiredCount = vehicles.filter(v => v.status === 'Retired').length;

    // Mock Data for Charts (keeping history data static for now, pie dynamic)
    const tripData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Trips Completed',
                data: [12, 19, 15, 22, 18, 10, trips.filter(t => t.status === 'Completed').length],
                backgroundColor: 'rgba(37, 99, 235, 0.8)',
                borderRadius: 6,
            },
        ],
    };

    const costData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                fill: true,
                label: 'Operational Cost',
                data: [4500, 5200, 4800, 6100, 5800, 6300],
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const statusData = {
        labels: ['Available', 'On Trip', 'In Shop', 'Retired'],
        datasets: [
            {
                data: [availableCount, onTripCount, maintenanceCount, retiredCount],
                backgroundColor: [
                    '#10b981', // Emerald 500
                    '#f59e0b', // Amber 500
                    '#ef4444', // Red 500
                    '#6b7280', // Slate 500
                ],
                borderWidth: 0,
            },
        ],
    };

    const recentActivity = activeTrips.map(t => {
        const v = vehicles.find(veh => veh.id === t.vehicleId);
        const d = drivers.find(drv => drv.id === t.driverId);
        return {
            id: t.id,
            vehicle: v?.name || 'Unknown',
            driver: d?.name || 'Unknown',
            destination: `${t.source} → ${t.destination}`,
            status: t.status === 'Active' ? 'On Trip' : 'Completed',
            time: `ETA: ${t.expectedDate}`
        };
    }).slice(0, 5); // show top 5

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(255,255,255,0.05)',
                },
                ticks: {
                    font: { size: 10, family: 'Inter' },
                    color: '#94a3b8',
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10, family: 'Inter' },
                    color: '#94a3b8',
                }
            }
        }
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Command Center</h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">Real-time oversight of global fleet operations and logistics.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all shadow-glass">Export Report</Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white font-semibold transition-all hover:scale-105 active:scale-95">System Live</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Active Fleet"
                    value={totalVehicles}
                    trend="+2 new"
                    isPositive={true}
                    icon={Truck}
                    gradient="from-blue-500/10 to-transparent"
                    iconBg="bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    glow="group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/10"
                />
                <KPICard
                    title="Maintenance Alerts"
                    value={maintenanceCount}
                    trend={maintenanceCount > 0 ? "Action Required" : "All Clear"}
                    isPositive={maintenanceCount === 0}
                    icon={AlertTriangle}
                    gradient="from-red-500/10 to-transparent"
                    iconBg="bg-red-500/20 text-red-400 border border-red-500/30"
                    glow="group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] border-red-500/10"
                />
                <KPICard
                    title="Pending Cargo"
                    value={activeTrips.length}
                    trend={`${pendingCargoTons}t total`}
                    isPositive={true}
                    icon={Package}
                    gradient="from-emerald-500/10 to-transparent"
                    iconBg="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    glow="group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/10"
                />
                <KPICard
                    title="Utilization Rate"
                    value={utilizationRate}
                    suffix="%"
                    trend="+4.2%"
                    isPositive={utilizationRate > 50}
                    icon={Percent}
                    gradient="from-violet-500/10 to-transparent"
                    iconBg="bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    glow="group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] border-violet-500/10"
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-8 lg:grid-cols-3">
                <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10 bg-white/5">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <ActivityIcon className="w-5 h-5 text-blue-400" /> Operational Cost
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-8 pb-4 px-6 relative">
                        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
                        <div className="h-[320px] w-full relative z-10">
                            <Line data={costData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden group hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300">
                    <CardHeader className="pb-4 border-b border-white/10 bg-white/5">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Truck className="w-5 h-5 text-emerald-400" /> Fleet Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 px-6">
                        <div className="h-[220px] w-full flex items-center justify-center relative">
                            <Pie
                                data={statusData}
                                options={{
                                    ...chartOptions,
                                    scales: undefined,
                                    plugins: { legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { size: 12, family: 'Inter' }, color: '#cbd5e1' } } }
                                }}
                            />
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0"></div>
                                <p className="text-xs text-slate-400 font-medium tracking-wide">AVAILABLE</p>
                                <p className="text-2xl font-black text-emerald-400 mt-1">{availableCount.toString().padStart(2, '0')}</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"></div>
                                <p className="text-xs text-slate-400 font-medium tracking-wide">ACTIVE/SHOP</p>
                                <p className="text-2xl font-black text-blue-400 mt-1">{onTripCount}/{maintenanceCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-white/5 pb-4">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-purple-400" /> Deliveries
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span> Current Week
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 px-6 relative">
                        <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none"></div>
                        <div className="h-[240px] w-full relative z-10">
                            <Bar data={tripData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4 bg-white/5">
                    <div>
                        <CardTitle className="text-xl font-bold text-white tracking-tight">Global Movement Log</CardTitle>
                        <p className="text-sm text-slate-400 mt-1 font-medium">Live tracking of active trip statuses across regions.</p>
                    </div>
                    <Button variant="link" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                        View All Logs <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="w-[100px] font-bold text-slate-300">Trip ID</TableHead>
                                <TableHead className="font-bold text-slate-300">Vehicle</TableHead>
                                <TableHead className="font-bold text-slate-300">Operator</TableHead>
                                <TableHead className="font-bold text-slate-300">Destination</TableHead>
                                <TableHead className="font-bold text-slate-300 text-center">Status</TableHead>
                                <TableHead className="font-bold text-slate-300 text-right">Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500 border-none font-medium">No active trips</TableCell>
                                </TableRow>
                            ) : recentActivity.map((trip) => (
                                <TableRow key={trip.id} className="hover:bg-white/5 transition-colors border-white/10 group">
                                    <TableCell className="font-mono text-sm font-bold text-blue-400">{trip.id}</TableCell>
                                    <TableCell className="font-medium text-white group-hover:text-blue-200 transition-colors">{trip.vehicle}</TableCell>
                                    <TableCell className="text-slate-300 font-medium">{trip.driver}</TableCell>
                                    <TableCell className="text-slate-400 truncate max-w-[150px]">{trip.destination}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={cn(
                                            "border border-white/10 px-3 py-1 font-bold shadow-sm backdrop-blur-md",
                                            trip.status === 'On Trip' ? "bg-amber-500/20 text-amber-400" :
                                                trip.status === 'Completed' ? "bg-emerald-500/20 text-emerald-400" :
                                                    "bg-red-500/20 text-red-400"
                                        )}>
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-slate-500 font-semibold">{trip.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
}

interface KPICardProps {
    title: string;
    value: number | string;
    suffix?: string;
    trend: string;
    isPositive: boolean;
    icon: React.ElementType;
    gradient: string;
    iconBg: string;
    glow: string;
}

function KPICard({ title, value, suffix = "", trend, isPositive, icon: Icon, gradient, iconBg, glow }: KPICardProps) {
    return (
        <Card className={cn(
            "bg-white/5 backdrop-blur-xl group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10",
            glow
        )}>
            {/* Gradient Overlay */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 z-0", gradient)}></div>

            <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">{title}</p>
                        <h3 className="text-5xl font-black text-white tracking-tighter flex items-end drop-shadow-md">
                            <CountUp end={Number(value)} duration={2.5} separator="," />
                            {suffix && <span className="text-2xl text-slate-400 mb-1 ml-1 font-bold">{suffix}</span>}
                        </h3>
                    </div>
                    <div className={cn("p-3.5 rounded-2xl shadow-lg backdrop-blur-md", iconBg)}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                    <div className={cn(
                        "flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full border border-white/5 shadow-sm backdrop-blur-md",
                        isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    )}>
                        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {trend}
                    </div>
                    <span className="text-sm text-slate-500 font-medium">vs last month</span>
                </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-white/10 transition-colors duration-500"></div>
        </Card>
    );
}
