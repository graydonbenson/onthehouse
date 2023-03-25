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
import { Grid, createTheme, ThemeProvider, Chip, Card, CardHeader, Tooltip, Paper, CardMedia, CardContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../components/LoadingIcon';
import { red } from '@mui/material/colors';

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
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

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
          <>
            <Box sx={{ display: 'flex', backgroundColor: "#fee7e7" }}>
              <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
              <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Card sx={{ maxWidth: 1000, color: "black", backgroundColor: "#f5c589", borderRadius: "20px", boxShadow: 20, textAlign: "center" }}>
                      <CardHeader
                      avatar={
                        <Tooltip title={post?.userId}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{post.userId?.substring(0, 1)}</Avatar>
                        </Tooltip>
                      }
                      action={<Paper elevation={8} sx={{width: 80, fontStyle: "oblique", fontWeight: "bold", backgroundColor: "#0288d1", color: "white", textAlign: "center"}}>{post?.flair}</Paper>}
                      title={<Typography variant="body1" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", fontSize: "20px"}}>{post?.title}</Typography>}
                      subheader={<Typography variant="">Creator: &nbsp;{post?.userId}</Typography>}
                      />
                      <CardMedia
                        component="img"
                        height="600"
                        image={post?.image}
                        alt=""
                      />
                      <CardContent>
                        <IconButton aria-label="Upvote Recipe">
                        <ThumbUpIcon
                        onClick={async () => await handleLikeClick()}
                        style={{ color: like ? 'blue' : 'inherit' }}
                        />
                        </IconButton>
                        <Chip sx={{fontWeight: "bold", fontSize: "18px"}} label={post.upvoteCount} color="info"/>
                        <IconButton aria-label="Downvote Recipe">
                        <ThumbDownIcon
                          onClick={async () => await handleDislikeClick()}
                          style={{ color: dislike ? 'red' : 'inherit' }}
                        />
                        </IconButton>
                        <Typography variant="">Date Created: &nbsp;{new Date(post?.date?._seconds * 1000).toDateString()}</Typography>
                        <Typography variant="h6" sx={{textAlign: "left", fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", display: "block"}}>Ingredients:</Typography>
                        <Typography color="black" variant="subtitle1" sx={{display: "block", textAlign: "left"}}>{post?.ingredients}</Typography>
                        <Typography variant="h6" sx={{textAlign: "left", fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", display: "block"}}>Directions:</Typography>
                        <Typography color="black" variant="subtitle1" sx={{display: "block", textAlign: "left"}}>{post?.directions}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={11} sx={{ backgroundColor: "#fe647d", borderRadius: "16px", paddingRight: 2, paddingLeft: 2, marginBottom: 2, color: "white" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", fontSize: "40px" }}>Comments</Typography>
                    </Paper>
                    <Comments postId={params.id}/>
                    <Paper elevation={11} sx={{alignItems: "center", display: "inline-block", borderRadius: "18px", width: "85%", backgroundColor: "#f5c589"}}>
                      <TextField
                      label="Comment here"
                      value={comment}
                      onChange={handleCommentOnChange}
                      color="info"
                      variant="filled"
                      style={{ width: 360 }}
                      />
                      <IconButton
                      type="submit"
                      aria-label="Send Comment"
                      onClick={handleCommentOnSubmit}
                      >
                      <SendIcon />
                      </IconButton>
                      </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
      </ThemeProvider>
    </>
  );
};

export default PostPage;
