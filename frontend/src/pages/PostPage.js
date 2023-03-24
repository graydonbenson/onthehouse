import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comments from '../components/Comments';
import { Grid, createTheme, ThemeProvider, Chip } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../components/LoadingIcon';

export const PostPage = () => {
  const params = useParams();

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

  const [post, setPost] = useState({});
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [isLoading, setIsLoading] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCommentOnChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentOnSubmit = () => {
    postComment(comment, params.id, userData.username);
    setComment('');
  };

  async function handleLikeClick() {
    await postUpvote(params.id, userData.username, true);
  }

  async function handleDislikeClick() {
    await postUpvote(params.id, userData.username, false);
  }

  // Check if previously upvoted/downvoted
  useEffect(() => {
    const fetchUpvote = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upvotes/${params.id}/${userData.username}`
      );
      const json = await response.json();
      console.log(json); // debugging purposes

      if (response.ok) {
        if (json.isUpvote) {
          setLike(true);
          setDislike(false);
        } else {
          setLike(false);
          setDislike(true);
        }
      } else {
        console.log(json);
      }
    };

    setIsLoading(true);
    fetchUpvote();
    setIsLoading(false);
  }, [params.id, userData.username]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${params.id}`
      );
      const json = await response.json();
      if (response.ok) {
        setPost(json);
      } else {
        console.log('did not work');
      }
    };

    setIsLoading(true);
    fetchPost();
    setIsLoading(false);
  }, [params.id]);

  const postComment = (text, pID, uID) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/comments/${pID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text, userId: uID }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
    setIsLoading(false);
  };

  const postUpvote = async (postId, userId, isUpvote) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upvotes/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, userId, isUpvote }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        if (isUpvote) {
          setLike(true);
          setDislike(false);
        } else {
          setLike(false);
          setDislike(true);
        }
        window.location.reload();
      } else {
        console.log(json);
        alert(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {post && (
          <>
            <Box sx={{ display: 'flex' }}>
              <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
              <SideDrawer
                open={open}
                closeDrawer={handleDrawerClose}
              ></SideDrawer>
              <Box
                component="main"
                sx={{
                  mt: 15,
                  mb: 15,
                  ml: 15,
                  width: 650,
                  backgroundColor: '#def9f5',
                }}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography paragraph>{post.title}</Typography>
                <Box
                  component="img"
                  sx={{
                    width: 600,
                  }}
                  src={post.image}
                ></Box>
                <Box
                  sx={{ flexGrow: 1, mt: 1 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Avatar
                    sx={{ bgcolor: 'red', width: 30, height: 30, ml: 3 }}
                    aria-label="recipe"
                  >
                    {post.userId?.substring(0, 1)}
                  </Avatar>
                  <Typography sx={{ ml: 2 }}>{post.userId}</Typography>
                  <IconButton aria-label="Upvote Recipe" sx={{ ml: 30 }}>
                    <ThumbUpIcon
                      onClick={async () => await handleLikeClick()}
                      style={{ color: like ? 'blue' : 'inherit' }}
                    />
                  </IconButton>
                  {/* TODO Ahad/Mush - change color to color theme from mush's branch */}
                  <Chip label={post.upvoteCount} color="primary" />

                  <IconButton aria-label="Downvote Recipe">
                    <ThumbDownIcon
                      onClick={async () => await handleDislikeClick()}
                      style={{ color: dislike ? 'red' : 'inherit' }}
                    />
                  </IconButton>
                </Box>
                <Typography
                  sx={{
                    mt: 2,
                    ml: 3,
                    mr: 3,
                    textAlign: 'justify',
                    whiteSpace: 'pre-wrap',
                  }}
                  paragraph
                >
                  <b>Ingredients:</b>
                  <br />
                  {post.ingredients}
                </Typography>
                <Typography
                  sx={{
                    ml: 3,
                    mr: 3,
                    textAlign: 'justify',
                    whiteSpace: 'pre-wrap',
                  }}
                  paragraph
                >
                  <b>Directions:</b>
                  <br />
                  {post.directions}
                </Typography>
              </Box>
              <Box
                component="main"
                sx={{ mt: 15, mb: 15, pr: 10 }}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Grid>
                  <Comments postId={params.id} />
                </Grid>
                <Grid>
                  <div>
                    <TextField
                      id="filled-multiline-flexible"
                      label="Comment here"
                      value={comment}
                      onChange={handleCommentOnChange}
                      multiline
                      maxRows={4}
                      variant="filled"
                      style={{ width: 360 }}
                    />
                  </div>
                  <IconButton
                    type="submit"
                    aria-label="Send Comment"
                    onClick={handleCommentOnSubmit}
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default PostPage;
