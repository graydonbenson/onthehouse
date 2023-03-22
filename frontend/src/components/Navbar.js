import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Backdrop, Button, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navbar({ open, openDrawer }) {

  const [gotToHome, setGoToHome] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function authStatus() {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/verifyAuth`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      if (data.successMessage) {
        setAuthentication(true);
      }
      setLoading(false);
    };
    authStatus();
  }, [])

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <img alt={"Loading"} src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDE4NGE2N2M0NThhNmE3ZmQ5MTUzZjE1NTdhZjJkZWFiYjNmMjc0YyZjdD1z/KcWaUe5tKkIrSI2LaU/giphy.gif"} width="100" height="100" />
        <Typography variant="h4">Loading....</Typography>
      </Backdrop>
    )
  }

  if (gotToHome) {
    return <Navigate to="/" />
  }

  async function handleLogout() {
    const response = await axios.post("/logout");
    if (response.status === 200) {
      localStorage.removeItem("userData");
      setGoToHome(true);
    } else {
      alert("Error occurred when logging out");
    }
  }

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={openDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          textAlign={'left'}
          sx={{ flexGrow: 1 }}
        >
          <Link to={"/dashboard"} style={{ color: 'inherit', textDecoration: 'none' }}>
            On The House 🍜
          </Link>
        </Typography>
        {isAuthenticated ?
          (<>
            <Button onClick={handleLogout} variant="contained" color="error" sx={{ fontStyle: "oblique", mr: 1 }}>Logout</Button>
            <Tooltip title={userData?.username}>
              <Avatar sx={{ bgcolor: red[500] }}> {userData?.username.charAt(0)} </Avatar>
            </Tooltip>
          </>) :
          (<>
            <Button component={Link} to="/login" variant="contained" color="secondary" sx={{ fontStyle: "oblique", fontWeight: "bold", mr: 1 }}>Login</Button>
            <Button component={Link} to="/signup" variant="contained" color="info" sx={{ fontStyle: "oblique", fontWeight: "bold" }}>Sign Up</Button>
          </>)}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;