import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { usePostsContext } from '../hooks/usePostsContext';
import { Link } from "react-router-dom";

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
                            <Grid item xs={12} sm={6} md={5} lg={3} key={post.id}>
                                <RecipeCard postId={post.id} />
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    maxWidth={345}
                                    pt={2}
                                    gap={3}
                                >
                                    <Button
                                        variant='outlined'
                                    >
                                        <Link 
                                            style={{color: 'inherit', textDecoration: 'none'}}
                                            to={`/edit/${post.id}`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='error'
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default MyRecipes;