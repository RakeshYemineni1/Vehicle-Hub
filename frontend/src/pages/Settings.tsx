import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Shield, Paintbrush, Power, Laptop, Eye, Fingerprint, Lock, HardDrive } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const handleSave = () => {
        toast.success('Settings saved successfully');
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">System Configuration</h1>
                    <p className="text-slate-400 mt-2 text-lg font-medium">Manage preferences, security, and profile diagnostics.</p>
                </div>
                <Button onClick={logout} variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white transition-all gap-2 font-bold group shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                    <Power className="w-4 h-4 group-hover:scale-110 transition-transform" /> Disconnect Session
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Menu */}
                <div className="md:col-span-1 space-y-2">
                    <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'profile' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                        <User className="w-5 h-5" /> User Profile
                    </button>
                    <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'security' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                        <Shield className="w-5 h-5" /> Access & Security
                    </button>
                    <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'notifications' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                        <Bell className="w-5 h-5" /> Notification Feed
                    </button>
                    <button onClick={() => setActiveTab('appearance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'appearance' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                        <Paintbrush className="w-5 h-5" /> Visuals & UI
                    </button>
                    <button onClick={() => setActiveTab('system')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'system' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                        <HardDrive className="w-5 h-5" /> System Diagnostics
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3">
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass overflow-hidden min-h-[500px]">
                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <CardHeader className="border-b border-white/10 pb-6 bg-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                            <span className="text-4xl font-black text-white drop-shadow-md">{user?.name ? user.name[0] : 'U'}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-3xl font-extrabold text-white tracking-tight">{user?.name || 'Authorized User'}</CardTitle>
                                            <CardDescription className="text-blue-400 font-bold mt-1 text-sm tracking-wide uppercase">{user?.role || 'Fleet Operator'}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">Display Name</label>
                                            <Input defaultValue={user?.name} className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500/50 transition-all h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">Primary Email</label>
                                            <Input defaultValue="admin@fleetflow.com" className="bg-white/5 border-white/10 text-slate-400 focus:bg-white/10 transition-all h-12 rounded-xl pointer-events-none opacity-60" readOnly />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">Timezone</label>
                                            <Select defaultValue="est">
                                                <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500/50 transition-all rounded-xl">
                                                    <SelectValue placeholder="Select timezone" />
                                                </SelectTrigger>
                                                <SelectContent className="border-white/10 bg-slate-900 text-slate-300 rounded-xl">
                                                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                                    <SelectItem value="utc">Universal (UTC)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">Language</label>
                                            <Select defaultValue="en">
                                                <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500/50 transition-all rounded-xl">
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent className="border-white/10 bg-slate-900 text-slate-300 rounded-xl">
                                                    <SelectItem value="en">English (US)</SelectItem>
                                                    <SelectItem value="es">Español</SelectItem>
                                                    <SelectItem value="fr">Français</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 flex justify-end">
                                        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] px-8 font-bold text-lg h-12 rounded-xl transition-all hover:scale-105 active:scale-95">Update Profile</Button>
                                    </div>
                                </CardContent>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <CardHeader className="border-b border-white/10 pb-6 bg-white/5">
                                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-emerald-400" /> Access & Security Control
                                    </CardTitle>
                                    <CardDescription className="text-slate-400">Manage your passwords, two-factor auth, and active sessions.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white border-l-4 border-emerald-500 pl-3">Authentication</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">Current Password</label>
                                                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50 transition-all h-12 rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-xs">New Password</label>
                                                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-emerald-500/50 transition-all h-12 rounded-xl" />
                                            </div>
                                            <div className="col-span-full pt-2">
                                                <Button onClick={handleSave} className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 transition-all font-bold px-6 h-10 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">Change Password</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white border-l-4 border-blue-500 pl-3">Key Settings</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <Fingerprint className="w-6 h-6 text-blue-400" />
                                                    <div>
                                                        <p className="font-bold text-white text-lg tracking-tight">Two-Factor Authentication</p>
                                                        <p className="text-sm text-slate-400 font-medium">Require an extra step on login.</p>
                                                    </div>
                                                </div>
                                                <Switch id="2fa" defaultChecked className="data-[state=checked]:bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <Lock className="w-6 h-6 text-blue-400" />
                                                    <div>
                                                        <p className="font-bold text-white text-lg tracking-tight">Require PIN on Launch</p>
                                                        <p className="text-sm text-slate-400 font-medium">Ask for session PIN after 15 mins idle.</p>
                                                    </div>
                                                </div>
                                                <Switch id="pin" className="data-[state=checked]:bg-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <CardHeader className="border-b border-white/10 pb-6 bg-white/5">
                                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Paintbrush className="w-6 h-6 text-purple-400" /> Visual Interface
                                    </CardTitle>
                                    <CardDescription className="text-slate-400">Customize the look and feel of your command center.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-3">Dashboard Theme</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border-2 border-purple-500 bg-[#090b14] p-4 rounded-2xl flex items-center justify-between cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
                                                <div className="flex items-center gap-3 relative z-10">
                                                    <Eye className="w-5 h-5 text-purple-400" />
                                                    <span className="font-bold text-white text-lg">Cinematic Dark</span>
                                                </div>
                                                <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] relative z-10"></div>
                                            </div>
                                            <div className="border border-white/10 bg-slate-50 p-4 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
                                                <div className="flex items-center gap-3">
                                                    <Eye className="w-5 h-5 text-slate-500" />
                                                    <span className="font-bold text-slate-900 text-lg">Legacy Light</span>
                                                </div>
                                                <div className="text-xs font-bold bg-slate-200 text-slate-500 px-2 py-1 rounded">DEPRECATED</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white border-l-4 border-blue-500 pl-3">Data Density</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <Laptop className="w-6 h-6 text-blue-400" />
                                                    <div>
                                                        <p className="font-bold text-white text-lg tracking-tight">Compact Table Views</p>
                                                        <p className="text-sm text-slate-400 font-medium">Show more rows by reducing cell padding.</p>
                                                    </div>
                                                </div>
                                                <Switch id="density" className="data-[state=checked]:bg-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        )}

                    </Card>
                </div>
            </div>
        </div>
    );
}
