import { Backdrop, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    
    const [isAuthenticated, setAuthentication] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        async function authStatus() {
            if (!userData) {
                setAuthentication(false);
                setLoading(false);
                return;
            }
            const response = await axios.post("/verifyAuth", {token: userData.userCredentialsToken});
            if (response.data.successMessage) {
                setAuthentication(true);
            }
            setLoading(false);
        };
        authStatus();
    }, [userData])
    
    if (isLoading) {
        return (
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <img alt={"Loading"} src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDE4NGE2N2M0NThhNmE3ZmQ5MTUzZjE1NTdhZjJkZWFiYjNmMjc0YyZjdD1z/KcWaUe5tKkIrSI2LaU/giphy.gif"} width="100" height="100" />
            <Typography variant="h4">Loading....</Typography>
            </Backdrop>
        );
    }
    
    return (isAuthenticated ? <Outlet/> : <Navigate to="/login"/>);
}

export default ProtectedRoute;