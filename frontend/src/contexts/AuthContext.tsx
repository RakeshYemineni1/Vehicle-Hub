import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export type UserRole = 'Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';

interface User {
    email: string;
    role: UserRole;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('vehiclehub_user');
        const token = localStorage.getItem('vehiclehub_token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password);
            const { token, role } = response.data;
            
            const roleMap: Record<string, UserRole> = {
                'ROLE_FLEET_MANAGER': 'Manager',
                'ROLE_DISPATCHER': 'Dispatcher',
                'ROLE_SAFETY_OFFICER': 'Safety Officer',
                'ROLE_FINANCIAL_ANALYST': 'Financial Analyst',
            };

            const mockUser: User = {
                email,
                role: (roleMap[role] ?? role) as UserRole,
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            };

            setUser(mockUser);
            setIsAuthenticated(true);
            localStorage.setItem('vehiclehub_user', JSON.stringify(mockUser));
            localStorage.setItem('vehiclehub_token', token);

            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('vehiclehub_user');
        localStorage.removeItem('vehiclehub_token');
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
