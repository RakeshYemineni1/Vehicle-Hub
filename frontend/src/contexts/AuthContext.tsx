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
        const savedUser = localStorage.getItem('fleetflow_user');
        const token = localStorage.getItem('fleetflow_token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password);
            const { token, role } = response.data;
            
            const mockUser: User = {
                email,
                role: role.replace('ROLE_', '').replace('_', ' ').split(' ').map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ') as UserRole,
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            };

            setUser(mockUser);
            setIsAuthenticated(true);
            localStorage.setItem('fleetflow_user', JSON.stringify(mockUser));
            localStorage.setItem('fleetflow_token', token);

            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('fleetflow_user');
        localStorage.removeItem('fleetflow_token');
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
