import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

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

function Navbar({open, openDrawer}) {
  return (
    <AppBar position="absolute" open={open}>
          <Toolbar sx={{pr: '24px', }}>
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
            <Link to={"/dashboard"}>
              <Typography
                style={{
                  position: "absolute", 
                  left: '50%', 
                  top: '50%', 
                  transform: 'translate(-50%, -50%)'
                }}
                component="h1"
                variant="h6"
                color="white"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                On The House
              </Typography>
            </Link>
          </Toolbar>
    </AppBar>
  )
}

export default Navbar;