import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export function GlobalLayout() {
    return (
        <div className="min-h-screen bg-transparent">
            <Sidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <Navbar />
                <main className="p-8 flex-1 animate-in fade-in duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
