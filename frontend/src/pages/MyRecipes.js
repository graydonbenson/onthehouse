import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import { Backdrop, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Skeleton, Stack, ThemeProvider, Typography } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { usePostsContext } from '../hooks/usePostsContext';
import { Link } from "react-router-dom";
import axios from 'axios';

const MyRecipes = () => {
    const { posts, dispatch } = usePostsContext();

    const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#f4bd7b',
            contrastText: '#000000',
          },
          secondary: {
            main: '#fe647d',
          },
        },
      });

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
        setCardIsLoading(true);
        const userData = JSON.parse(localStorage.getItem("userData"));
        const fetchUserPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/user/${userData.username}`);
            const json = await response.json();
            if (response.ok) {
                if (json.hasOwnProperty('message')) {
                    dispatch({
                        type: 'SET_POSTS',
                        payload: []
                    });
                } else {
                    dispatch({
                        type: 'SET_POSTS',
                        payload: json
                    });
                }
                setCardIsLoading(false);
            } else {
                setError("Error: " + json.message);
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
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', backgroundColor: "#fee7e7" }}>
                <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
                <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                    <>  
                        <Paper elevation={11} sx={{display: "inline-block", backgroundColor: "#fe647d", borderRadius: "16px", paddingRight: 2, paddingLeft: 2, marginBottom: 2, color: "white"}}>
                        <Typography variant="body1" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", fontSize: "40px"}}>My Recipes</Typography>
                        </Paper>
                        {posts &&
                            <>
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
                                                        upvoteCount={post.upvoteCount}
                                                        flairTag={post.flair}
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
                                                            color="info"
                                                        >
                                                            <Link
                                                                style={{ color: 'inherit', textDecoration: 'none', fontWeight: "bold" }}
                                                                to={`/edit/${post.id}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant='contained'
                                                            sx={{fontWeight: "bold"}}
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
                                            color="info"
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
                            </>}
                    </>
                </Box>
            </Box>
            </ThemeProvider>
        </>
    );
}

export default MyRecipes;