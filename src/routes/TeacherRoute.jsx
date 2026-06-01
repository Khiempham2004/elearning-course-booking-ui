import React from 'react';
import { Navigate } from "react-router-dom";
import { getUser } from '../utils/Auth.js';

const TeacherRoute = ({ children }) => {
    const user = getUser();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (user.role?.toLowerCase() !== "teacher") {
        return <Navigate to='/' replace />;
    }

    // ktra list role dc phep
    // if (roles && !roles.includes(user.role?.toLowerCase())) {
    //     return <Navigate to="/" replace />;
    // }

    return children;
}

export default TeacherRoute;
