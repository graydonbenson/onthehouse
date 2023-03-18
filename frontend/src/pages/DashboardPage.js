import { useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import MainFeaturedPost from '../components/Motw';

const mainFeaturedPost = {
    title: 'Meal of the Week',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
    
};

function DashboardPage() {

  const [open, setOpen] = useState(false);

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
    <MainFeaturedPost post={mainFeaturedPost}/>
        <Grid container spacing={2}>
            {cards}
        </Grid>
    </Box>
    </Box>
    </>
  )
}

export default DashboardPage;