import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Truck,
    Users,
    Settings,
    BarChart3,
    ClipboardList,
    ShieldAlert,
    LogOut,
    Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/contexts/AuthContext';

interface SidebarItem {
    icon: any;
    label: string;
    path: string;
    allowedRoles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', allowedRoles: ['Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
    { icon: Truck, label: 'Fleet', path: '/fleet', allowedRoles: ['Manager', 'Dispatcher'] },
    { icon: ClipboardList, label: 'Trips', path: '/trips', allowedRoles: ['Manager', 'Dispatcher', 'Financial Analyst'] },
    { icon: Users, label: 'Drivers', path: '/drivers', allowedRoles: ['Manager', 'Safety Officer'] },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance', allowedRoles: ['Manager', 'Dispatcher', 'Safety Officer'] },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', allowedRoles: ['Manager', 'Financial Analyst', 'Dispatcher'] },
    { icon: ShieldAlert, label: 'Incidents', path: '/incidents', allowedRoles: ['Manager', 'Safety Officer'] },
    { icon: Settings, label: 'Settings', path: '/settings', allowedRoles: ['Manager', 'Safety Officer', 'Financial Analyst'] },
];

export function Sidebar() {
    const { user, logout } = useAuth();

    const filteredItems = sidebarItems.filter(item =>
        user && item.allowedRoles.includes(user.role)
    );

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white/5 backdrop-blur-2xl text-slate-300 flex flex-col z-50 border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Truck className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">VehicleHub</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative border-l-4",
                            isActive
                                ? "bg-white/5 text-white border-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                : "border-transparent hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5 transition-transform duration-200",
                            "group-hover:scale-110",
                            ({ isActive }: any) => isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                        )} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="px-3 py-3 mb-2 rounded-lg bg-white/5 border border-white/10 shadow-glass">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Role</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-200">{user?.role}</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 group"
                >
                    <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
