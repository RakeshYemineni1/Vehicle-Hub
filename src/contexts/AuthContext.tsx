import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

interface User {
    email: string;
    role: UserRole;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('fleetflow_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email: string, role: UserRole) => {
        const mockUser: User = {
            email,
            role,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('fleetflow_user', JSON.stringify(mockUser));

        // Role-based redirection
        switch (role) {
            case 'Manager':
                navigate('/');
                break;
            case 'Dispatcher':
                navigate('/trips');
                break;
            case 'Safety Officer':
                navigate('/drivers');
                break;
            case 'Financial Analyst':
                navigate('/analytics');
                break;
            default:
                navigate('/');
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('fleetflow_user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
