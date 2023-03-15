import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleTagChange = (event) => setTag(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle submit logic here
  };

  return (
    <Container maxWidth="sm">
      <Card>
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
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={imageUrl}
              onChange={handleImageUrlChange}
            />
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