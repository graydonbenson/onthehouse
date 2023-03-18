import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [imageUrl, setImageUrl] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleTagChange = (event) => setTag(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);
  const handleImage = (event) => setSelectedFile(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle submit logic here

    const formData = new FormData();
    formData.append('image', selectedFile);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <ListItemButton>
          <Link to={"/dashboard"}>
            <ListItemIcon>
              <ArrowBackIosIcon />
            </ListItemIcon>
          </Link>
        </ListItemButton>
        <CardHeader title="Upload a new recipe:" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
            <TextField
              label="Tag(s)"
              fullWidth
              margin="normal"
              multiline
              rows={1}
              value={tag}
              onChange={handleTagChange}
            />
            <input type = "file" onChange={handleImage}/>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreatePost;