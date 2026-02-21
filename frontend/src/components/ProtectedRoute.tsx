import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to a default page for their role if they try to access an unauthorized route
        const defaultPaths: Record<UserRole, string> = {
            'Manager': '/',
            'Dispatcher': '/trips',
            'Safety Officer': '/drivers',
            'Financial Analyst': '/analytics'
        };
        return <Navigate to={defaultPaths[user.role]} replace />;
    }

    return <>{children}</>;
}
