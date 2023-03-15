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
  const [imageUrl, setImageUrl] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle submit logic here
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
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
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
            <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
             onChange={handleFileInput}
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