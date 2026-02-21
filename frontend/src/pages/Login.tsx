import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
    const [username, setUsername] = useState('manager');
    const [password, setPassword] = useState('password123');
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#090b14] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400"></div>
            <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
            <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>

            <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 animate-in fade-in zoom-in duration-700 rounded-2xl">
                <CardHeader className="space-y-4 text-center pb-8 border-b border-white/5">
                    <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-transform">
                        <Truck className="text-white w-8 h-8 drop-shadow-md" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Welcome Back</CardTitle>
                        <CardDescription className="text-slate-400 font-medium text-base">Enter your credentials to access FleetFlow</CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-8">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-300 ml-1 tracking-wide uppercase text-xs">Username</label>
                            <Input
                                type="text"
                                placeholder="manager"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-blue-500/50 transition-all rounded-xl focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-300 ml-1 tracking-wide uppercase text-xs">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-blue-500/50 transition-all rounded-xl focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="text-xs text-slate-400 bg-white/5 p-3 rounded-lg">
                            <p className="font-semibold mb-1">Test Accounts:</p>
                            <p>manager / password123</p>
                            <p>dispatcher / password123</p>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-4 pb-8">
                        <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl text-base font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] text-white hover:scale-[1.02] active:scale-[0.98]">
                            Sign In to Dashboard
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <p className="absolute bottom-8 left-0 w-full text-center text-slate-400 text-sm">
                © 2026 FleetFlow Digital Control System. All rights reserved.
            </p>
        </div>
    );
}
