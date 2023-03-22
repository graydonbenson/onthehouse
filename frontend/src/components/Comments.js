import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Comments() {
  const params = useParams();
  const [postComments, setPostComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://us-central1-seng-401-on-the-house.cloudfunctions.net/api/posts/${params.id}`);
      const json = await response.json();
      const com = json.comments;
      setPostComments(com.map(comments => comments.message));
      setUsers(com.map(comments => comments.userId));
    }

    fetchPost();
  }, [params.id]);

  return (
    <List sx={{ width: '100%', maxWidth: 450, maxHeight: 700, bgcolor: 'aliceblue' }}>
      {postComments.map((comment, index) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={users[index]} src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText style={{ transform:'translateY(50%)' }}>
            {users[index]}: {comment}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}