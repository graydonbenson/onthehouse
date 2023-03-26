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
  const [motwTitle, setMotwTitle] = useState("Meal of the Week");
  const [motwDesc, setMotwDesc] = useState("A new week, and a new chance for the oppurtunity to let your dish shine to the world!");
  const [motwImage, setMotwImage] = useState("https://source.unsplash.com/random");
  const [motwLink, setMotwLink] = useState("#");
  const [motwLinkText, setMotwLinkText] = useState("Coming Soon....");

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
      } else {
        // setError("Error: " + json.error);
        setCardIsLoading(false);
      }
    };

    const fetchMotw = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/motw`);
      const json = await response.json();
      console.log("post/" + json[0].id);
      if (json[0].userId) {
        setMotwTitle("Meal of the Week - " + json[0].title);
        setMotwImage(json[0].image);
        setMotwLink("/post/" + json[0].id);
        setMotwLinkText("Continue Reading....");
      }
      setCardIsLoading(false);
    };

    fetchPosts();
    fetchMotw();

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
            <MainFeaturedPost title={motwTitle} desc={motwDesc} image={motwImage} link={motwLink} linkText={motwLinkText} />
            <Grid container alignItems="center" spacing={4}>
              {posts && Object.values(posts).map(post =>
                <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
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
