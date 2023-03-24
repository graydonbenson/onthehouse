import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import {
  Grid,
  Skeleton,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import MainFeaturedPost from '../components/Motw';
import { usePostsContext } from '../hooks/usePostsContext';
import LoadingIcon from '../components/LoadingIcon';

const mainFeaturedPost = {
  title: 'Meal of the Week',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading....', 

};

const DashboardPage = () => {
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
  const [cardIsLoading, setCardIsLoading] = useState(false);
  //   const [error, setError] = useState('');
  //   const [data, setData] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCardIsLoading(true);
    const fetchPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const json = await response.json();
      if (response.ok) {
        dispatch({
          type: 'SET_POSTS',
          payload: json,
        });
        setCardIsLoading(false);
      } else {
        // setError("Error: " + json.error);
        setCardIsLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (cardIsLoading) {
    return <LoadingIcon />;
  }

    return (
      <>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', backgroundColor: "#fee7e7" }}>

          <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
          <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container alignItems="center" rowSpacing={4} columnSpacing={0}>
              {posts && Object.values(posts).map(post =>
                <Grid item xs={12} sm={6} md={5} lg={3} key={post.id}>
                  {cardIsLoading ?
                    <Stack spacing={1}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={210} height={100} />
                      <Skeleton variant="rounded" width={210} height={100} />
                    </Stack>
                    :
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
                  }
                </Grid>
              )
              }

            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default DashboardPage;
