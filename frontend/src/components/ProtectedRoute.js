import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    
    const [isAuthenticated, setAuthentication] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        async function authStatus() {
            const response = await axios.get("/verifyAuth");
            if (response.data.successMessage) {
                setAuthentication(true);
            }
            setLoading(false);
        };
        authStatus();
    }, [])
    
    if (isLoading) {
        return (<LinearProgress color="secondary"/>);
    }
    
    return (isAuthenticated ? <Outlet/> : <Navigate to="/login"/>);
}

export default ProtectedRoute;