import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Skeleton, Stack } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { usePostsContext } from '../hooks/usePostsContext';
import { Link } from "react-router-dom";

const MyRecipes = () => {
    const { posts, dispatch } = usePostsContext();

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [error, setError] = useState('');
    const [cardIsLoading, setCardIsLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAlertOpen = (id) => {
        setDeleteId(id);
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setDeleteId('');
        setAlertOpen(false);
    };

    useEffect(() => {
        // TO DO:
        // - get userId from localStorage or something of that sort (replace JohnDoe2 in URL below)
        // - fetch posts and populate RecipeCard with that information instead
        setCardIsLoading(true);
        const fetchUserPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/user/JohnDoe2`);
            const json = await response.json();
            if (response.ok) {
                dispatch({
                    type: 'SET_POSTS',
                    payload: json
                });
                setCardIsLoading(false);
            } else {
                setError("Error: " + json.error);
                setCardIsLoading(false);
            }
        }

        fetchUserPosts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            dispatch({ type: 'DELETE_POST', payload: id })
            handleAlertClose();
        } else {
            window.alert("Error: Could not delete post.");
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
                <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
                {posts && <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                    <h1 style={{ paddingBottom: 30 }}>My Recipes</h1>
                    {error &&
                        <div>
                            {error}
                        </div>
                    }
                    <Grid container spacing={2}>
                        {Object.values(posts).map(post =>
                            <Grid item xs={12} sm={6} md={5} lg={3} key={post.id}>
                                {cardIsLoading ?
                                    <Stack spacing={1}>
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="rectangular" width={210} height={100} />
                                        <Skeleton variant="rounded" width={210} height={100} />
                                    </Stack>
                                    :
                                    <>
                                        <RecipeCard
                                            postId={post.id}
                                            userId={post.userId}
                                            title={post.title}
                                            date={post.date}
                                            image={post.image}
                                            ingredients={post.ingredients}
                                            directions={post.directions}
                                        />

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
                                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                                    to={`/edit/${post.id}`}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => handleAlertOpen(post.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </>
                                }
                            </Grid>
                        )}
                    </Grid>
                    <Dialog
                        open={alertOpen}
                        onClose={handleAlertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete this post?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Deleting a post is an irreversible action. Continue?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleAlertClose}
                            >
                                No
                            </Button>
                            <Button
                                onClick={() => handleDelete(deleteId)}
                                autoFocus
                                variant='contained'
                                color='error'
                            >
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>}
            </Box>
        </>
    );
}

export default MyRecipes;