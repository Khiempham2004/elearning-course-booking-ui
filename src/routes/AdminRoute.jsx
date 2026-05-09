import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from '../utils/Auth.js';

const AdminRoute = ({ children, roles }) => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    if (user.role !== "admin") {
        return <Navigate to='/' />
    }

    if (roles && !roles.includes(user.role?.toLowerCase())) {
        return <Navigate to="/" replace />;
    }
    return children;
}


export default AdminRoute;
