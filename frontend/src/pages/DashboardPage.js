import React from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';

function DashboardPage() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
    <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8}}>
        <Typography paragraph>
          HERE IS WHERE THE MEAL OF THE WEEK WILL GO
        </Typography>
        <Grid container>
            <Grid item xs={12} m={6} lg={4}>
                <Paper>1</Paper>
            </Grid>
            <Grid item xs={12} m={6} lg={4}>
                <Paper>2</Paper>
            </Grid>
            <Grid item xs={12} m={6} lg={4}>
                <Paper>3</Paper>
            </Grid>
            <Grid item xs={12} m={6} lg={4}>
                <Paper>4</Paper>
            </Grid>
        </Grid>
    </Box>
    </Box>
    </>
  )
}

export default DashboardPage;