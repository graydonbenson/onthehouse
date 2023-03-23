import { Backdrop, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingIcon from './LoadingIcon';

function ProtectedRoute() {
  const [isAuthenticated, setAuthentication] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  // const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function authStatus() {
      const response = await fetch(
        `${process.env.REACT_APP_DEPLOYED_API_URL}/verifyAuth`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (data.successMessage) {
        setAuthentication(true);
      }
      setLoading(false);
    }
    authStatus();
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
