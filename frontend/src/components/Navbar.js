import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';

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
          <Toolbar sx={{pr: '24px'}}>
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
              variant="h6"
              color="inherit"
              noWrap
              textAlign={'left'}
              sx={{ flexGrow: 1 }}
            >
              On The House 🍜
            </Typography>
            <Button variant="contained" color="secondary" sx={{fontStyle: "oblique"}}>Login</Button>
            <Button variant="contained" color="success" sx={{fontStyle: "oblique"}}>Sign Up</Button>
            <Button variant="contained" color="error" sx={{fontStyle: "oblique", mr: 1}}>Logout</Button>
            <Tooltip title="Username">
            <Avatar sx={{ bgcolor: red[500] }}> R </Avatar>
            </Tooltip>
          </Toolbar>
    </AppBar>
  )
}

export default Navbar;