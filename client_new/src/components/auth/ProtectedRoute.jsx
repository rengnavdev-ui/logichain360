import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole');
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (!isAuthenticated) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/authentication-login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Role not authorized, redirect to their default dashboard
        const defaultRoutes = {
            admin: '/admin-dashboard',
            manager: '/manager-dashboard',
            driver: '/driver-pwa-app'
        };

        return <Navigate to={defaultRoutes[userRole] || '/'} replace />;
    }

    return children;
};

export default ProtectedRoute;
