import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, LinearProgress, Paper } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import MainFeaturedPost from '../components/Motw';
import axios from 'axios';
import { usePostsContext } from '../hooks/usePostsContext';

const mainFeaturedPost = {
  title: 'Meal of the Week',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',

};

const DashboardPage = () => {
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    setLoading(true);
    async function authStatus() {
      const response = await axios.get("/verifyAuth");
      if (response.data.successMessage) {
        setAuthentication(true);
        setLoading(false);
      } else {
        setAuthentication(false);
        setLoading(false);
      }
    }

    authStatus();
  }, []);
  

  const [open, setOpen] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
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

    fetchPosts();
  }, [dispatch]);

  if (isLoading) {
    return (<LinearProgress color='secondary'/>)
  } else {
    return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar open={open} openDrawer={handleDrawerOpen} authentication={isAuthenticated}></Navbar>
        <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={2}>
            {posts && Object.values(posts).map(post =>
              <Grid item xs={12} sm={6} md={5} lg={3} key={post.id}>
                <RecipeCard postId={post.id} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  )
}
}

export default DashboardPage;