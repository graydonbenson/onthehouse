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
import { Grid, createTheme, ThemeProvider, Backdrop } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const commentAPI = `${process.env.REACT_APP_DEPLOYED_API_URL}/comments/:`;

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
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  }

  const handleComment2 = () => {
    postComment(comment, params.id, userData.username);
    setComment('');
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/posts/${params.id}`);
      const json = await response.json();
      if (response.ok) {
        setPost(json);
      } else {
        console.log("did not work")
      }
    }

    fetchPost();
  }, [params.id]);

  const postComment = (text, pID, uID) => {
    const data = { text: text }; // data to be sent in the request body
    console.log(commentAPI + pID);
    fetch(commentAPI + pID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      message: JSON.stringify(data),
      //   Use below to make a comment, pass in message and userId into function, below values are placeholder
      body: JSON.stringify({ message: text, userId: uID}),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
  };

  function handleLikeClick() {
    setLike(true);
    setDislike(false);
  }

  function handleDislikeClick() {
    setLike(false);
    setDislike(true);
  }

  return (
    <>
      <ThemeProvider theme={theme}> 
        {post && <>
        <Box sx={{ display: 'flex' }}>
          <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
          <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
          <Box component="main"
            sx={{ mt: 15, mb: 15, ml: 15, width: 650, backgroundColor: '#def9f5' }}
            style={{ alignItems: "center", justifyContent: "center" }}>
            <Typography paragraph>
              {post.title}
            </Typography>
            <Box component="img"
              sx={{
                width: 600
              }}
              src={post.image}>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 1 }} style={{ display: "flex", alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: "red", width: 30, height: 30, ml: 3 }} aria-label="recipe">
                {post.userId?.substring(0, 1)}
              </Avatar>
              <Typography sx={{ ml: 2 }}>{post.userId}</Typography>
              <IconButton aria-label="Upvote Recipe" sx={{ ml: 52 }}>
                <ThumbUpIcon onClick={handleLikeClick} style={{ color: like ? 'blue' : 'inherit' }} />
              </IconButton>
              {post.upvoteCount}
              <IconButton aria-label="Downvote Recipe">
                <ThumbDownIcon onClick={handleDislikeClick} style={{ color: dislike ? 'red' : 'inherit' }} />
              </IconButton>
            </Box>
            <Typography sx={{ mt: 2, ml: 3, mr: 3, textAlign: "justify", whiteSpace: "pre-wrap" }} paragraph>
              <b>Ingredients:</b><br />{post.ingredients}
            </Typography>
            <Typography sx={{ ml: 3, mr: 3, textAlign: "justify", whiteSpace: "pre-wrap" }} paragraph>
              <b>Directions:</b><br />{post.directions}
            </Typography>
          </Box>
          <Box component="main"
            sx={{ mt: 15, mb: 15, pr: 10 }}
            style={{ alignItems: "center", justifyContent: "center" }}>
            <Grid>
              <Comments />
            </Grid>
            <Grid>
              <div>
                <TextField
                  id="filled-multiline-flexible"
                  label="Comment here"
                  value={comment}
                  onChange={handleComment}
                  multiline
                  maxRows={4}
                  variant="filled"
                  style={{ width: 360 }}
                />
              </div>
              <IconButton type="submit" aria-label="Send Comment" onClick={handleComment2}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Box>
        </Box>
        </>}
      </ThemeProvider>
    </>
  )
}

export default PostPage;