import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Settings as SettingsIcon } from 'lucide-react';

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between shadow-glass">
            <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <Input
                    placeholder="Search vehicles, drivers, or trips..."
                    className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-500/50 transition-all duration-300 rounded-lg text-sm text-white placeholder:text-slate-500"
                />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border border-[#0f172a] shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                </Button>

                <div className="h-8 w-px bg-white/10 mx-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 px-2 py-1.5 rounded-lg transition-colors">
                            <div className="text-right hidden sm:block transition-all">
                                <p className="text-sm font-semibold text-slate-100 leading-none tracking-tight group-hover:text-white transition-colors">{user?.name || 'Alex Rivera'}</p>
                                <p className="text-xs text-slate-400 mt-1">{user?.role || 'Fleet Manager'}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400 font-bold shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                                {user?.name?.[0] || <User className="w-5 h-5" />}
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-white/10 bg-[#0f172a] text-slate-300 shadow-2xl mt-2 rounded-xl">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
                                <p className="text-xs text-slate-400 leading-none mt-1">{user?.role}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <Link to="/settings">
                            <DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-white transition-colors gap-2">
                                <SettingsIcon className="w-4 h-4" /> System Settings
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors gap-2">
                            <LogOut className="w-4 h-4" /> Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
