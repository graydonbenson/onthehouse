import axios from 'axios';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthInvalidRoute = () => {

    const [isAuthenticated, setAuthentication] = React.useState(false);

    async function authStatus() {
        const response = await axios.get("/verifyAuth");
        if (response.data.successMessage) {
            setAuthentication(true);
        }
    }
    
    authStatus();

    return (isAuthenticated ? <Navigate to="/dashboard"/> : <Outlet/>);
}

export default AuthInvalidRoute;