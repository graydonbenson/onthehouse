import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { IconButton, Paper, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { red } from '@mui/material/colors';

export default function Comments({ postId }) {
  const [postComments, setPostComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/comments/${postId}`
      );
      const json = await response.json();
      //   console.log(json); - debugging purposes
      setPostComments(json.comments.map((c) => c.message));
      setUsers(json.comments.map((c) => c.userId));
    };

    fetchPost();
  }, [postId]);

  return (
    <>
    <List
      sx={{
        width: '100%',
        maxWidth: "100%",
        maxHeight: 700,
        bgcolor: "#f5c589",
        borderRadius: "18px",
        boxShadow: 11
      }}
    >
      {postComments.map((comment, index) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: red[500] }} alt={users[index]} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText style={{ transform: 'translateY(50%)' }}>
            <Typography variant="" sx={{fontSize: "18px"}}>{users[index]}: {comment}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </>
  );
}
