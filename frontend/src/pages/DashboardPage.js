import React from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid} from '@mui/material';
import RecipeCard from '../components/RecipeCard';

function DashboardPage() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push(<Grid item xs={12} sm={6} md={5} lg={3}>
                    <RecipeCard/>
               </Grid>);
  }

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
    <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8}}>
        <Typography paragraph>
          HERE IS WHERE THE MEAL OF THE WEEK WILL GO
        </Typography>
        <Grid container spacing={2}>
            {cards}
        </Grid>
    </Box>
    </Box>
    </>
  )
}

export default DashboardPage;