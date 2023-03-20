import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import RecipeCard from '../components/RecipeCard';

const MyRecipes = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const API = `${process.env.REACT_APP_API_URL}/users/:userId`;
        // TO DO:
        // - get userId from localStorage or something of that sort
        // - fetch posts and populate RecipeCard with that information instead
    }, []);

    const cards = [];
    for (let i = 0; i < 2; i++) {
        cards.push(<Grid item xs={12} sm={6} md={5} lg={3} key={i}>
            <RecipeCard />
        </Grid>);
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
                <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                    <h1 style={{paddingBottom: 30}}>My Recipes</h1>
                    <Grid container spacing={2}>
                        {cards}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default MyRecipes;