import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct for your project

const ProtectedRoute = () => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    // If the authentication state is still loading, it's good practice
    // to show a loading message to prevent a flicker.
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading Session...</div>;
    }

    // If a user is logged in, render the child component (e.g., the dashboard).
    // Otherwise, redirect them to the new admin login page.
    return currentUser ? <Outlet /> : <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;