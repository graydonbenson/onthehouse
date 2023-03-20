import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { usePostsContext } from '../hooks/usePostsContext';

const MyRecipes = () => {
    const { posts, dispatch } = usePostsContext();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // TO DO:
        // - get userId from localStorage or something of that sort (replace JohnDoe2 in URL below)
        // - fetch posts and populate RecipeCard with that information instead
        const fetchUserPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/user/JohnDoe2`);
            const json = await response.json();
            if (response.ok) {
                dispatch({
                    type: 'SET_POSTS',
                    payload: json
                })
            } else {
                setError("Error: " + json.error); 
            }
        }

        fetchUserPosts();
    }, [dispatch]);

    const cards = [];
    for (let i = 0; i < 2; i++) {
        cards.push(<Grid item xs={12} sm={6} md={5} lg={3} key={i}>
            <RecipeCard />
        </Grid>);
    }

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
                <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                    <h1 style={{ paddingBottom: 30 }}>My Recipes</h1>
                    {error &&
                        <div>
                            {error}
                        </div>
                    }
                    <Grid container spacing={2}>
                        {posts && Object.values(posts).map(post =>
                            <div key={post.id}>
                                <p>{post.image}</p>
                                <p>{post.title}</p>
                                <p>{post.ingredients}</p>
                                <p>{post.directions}</p>
                            </div>
                        )}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default MyRecipes;