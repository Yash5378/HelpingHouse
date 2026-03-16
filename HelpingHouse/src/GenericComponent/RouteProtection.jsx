import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouteProtection = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const accessToken = userData?.token;
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RouteProtection;