import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar, Download, TrendingUp, DollarSign, Activity, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import CountUp from 'react-countup';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { toast } from 'sonner';

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
    Legend
);

export default function Analytics() {
    const [date, setDate] = useState<Date>(new Date());

    const handleExportCSV = () => {
        toast.info("Exporting data to CSV...");
        setTimeout(() => toast.success("Analytics_Report.csv downloaded!"), 1500);
    };

    const handleExportPDF = () => {
        toast.info("Generating PDF Executive Report...");
        setTimeout(() => toast.success("Executive_Summary.pdf downloaded!"), 2000);
    };


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' as const, labels: { boxWidth: 12, usePointStyle: true, padding: 20, color: '#cbd5e1', font: { family: 'Inter' } } },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { family: 'Inter' } } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { dash: [4, 4] }, ticks: { color: '#94a3b8', font: { family: 'Inter' } } }
        }
    };

    // Executive Chart Data
    const roiData = {
        labels: ['Heavy Duty', 'Medium Duty', 'Light Duty', 'Specialized'],
        datasets: [
            {
                label: 'Average ROI (%)',
                data: [22, 18, 15, 26],
                backgroundColor: 'rgba(37, 99, 235, 0.8)',
                borderRadius: 4,
            }
        ]
    };

    const fuelTrendData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Fleet Avg (km/L)',
                data: [3.1, 3.15, 3.2, 3.25],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const costBreakdownData = {
        labels: ['Fuel', 'Maintenance', 'Driver Pay', 'Tolls/Routing', 'Insurance'],
        datasets: [
            {
                data: [45, 20, 25, 5, 5],
                backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
                borderWidth: 0,
            }
        ]
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Executive Analytics</h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">High-level financial and operational reporting.</p>
                </div>

                <div className="flex items-center flex-wrap gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white shadow-glass transition-all", !date && "text-slate-400")}>
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, "MMMM yyyy") : <span>Filter by Month</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-white/10 bg-slate-900" align="end">
                            <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={(d) => d && setDate(d)}
                                initialFocus
                                className="text-white"
                            />
                        </PopoverContent>
                    </Popover>

                    <Button variant="outline" onClick={handleExportCSV} className="bg-white/5 border-white/10 hover:bg-white/10 text-white shadow-glass transition-all">
                        <Download className="w-4 h-4 mr-2" /> CSV
                    </Button>
                    <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all font-semibold hover:scale-105 active:scale-95">
                        <FileText className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/5 backdrop-blur-xl group hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Fuel Efficiency</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter flex items-end drop-shadow-md">
                                    <CountUp end={3.2} decimals={1} duration={2} />
                                    <span className="text-2xl text-slate-400 mb-1 ml-1 font-bold">km/L</span>
                                </h3>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
                                <Activity className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl group hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Cost Per KM</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter flex items-end drop-shadow-md">
                                    <CountUp prefix="$" end={1.45} decimals={2} duration={2} />
                                </h3>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg backdrop-blur-md">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-red-500/10 transition-colors duration-500"></div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl group hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Vehicle ROI</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter flex items-end drop-shadow-md">
                                    <CountUp end={18.5} decimals={1} duration={2.5} suffix="%" />
                                </h3>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg backdrop-blur-md">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl group hover:scale-105 transition-all duration-300 overflow-hidden border border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Rev / Vehicle</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter flex items-end drop-shadow-md">
                                    <CountUp prefix="$" end={12450} duration={2.5} separator="," />
                                </h3>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg backdrop-blur-md">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                    <CardHeader className="border-b border-white/10 pb-4 bg-white/5">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" /> ROI by Vehicle Class
                        </CardTitle>
                        <CardDescription className="text-slate-400">Average return on investment across different fleet categories.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 pb-4 px-6 relative">
                        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
                        <div className="h-[320px] relative z-10">
                            <Bar data={roiData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden group hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300">
                    <CardHeader className="border-b border-white/10 pb-4 bg-white/5">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-400" /> Fuel Efficiency Trend
                        </CardTitle>
                        <CardDescription className="text-slate-400">Monthly progression of fleet-wide fuel consumption averages.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 pb-4 px-6 relative">
                        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
                        <div className="h-[320px] relative z-10">
                            <Line data={fuelTrendData} options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales?.y, min: 2.8, max: 3.5 } } }} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 shadow-glass overflow-hidden group hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
                    <CardHeader className="border-b border-white/10 pb-4 bg-white/5">
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-purple-400" /> Operating Cost Breakdown
                        </CardTitle>
                        <CardDescription className="text-slate-400">Distribution of expenses for the selected period.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-10 pb-6 px-6 relative">
                        <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none"></div>
                        <div className="h-[360px] flex justify-center relative z-10">
                            <div className="w-full max-w-lg">
                                <Pie
                                    data={costBreakdownData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { position: 'right', labels: { color: '#cbd5e1', font: { family: 'Inter', size: 12 }, padding: 20, usePointStyle: true } } }
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
