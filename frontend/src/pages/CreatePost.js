import { useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Box
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleTagChange = (event) => setTag(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle submit logic here

    console.log(title);
    console.log(description);
    console.log(tag);
    console.log(imageUrl);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
      <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
      <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 3, marginTop: 8 }}>
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Card>
            <CardHeader title="Upload a New Recipe" />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  fullWidth
                  margin="normal"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
                <TextField
                  label="Ingredients"
                  placeholder="e.g. Tomato, Ginger, Eggs, etc."
                  fullWidth
                  margin="normal"
                  multiline
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
                <TextField
                  label="Directions to Prepare"
                  placeholder="Step 1."
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
                <TextField
                  label="Tag(s)"
                  placeholder="e.g. Quick Meal, Greek, Dessert, etc."
                  fullWidth
                  margin="normal"
                  multiline
                  value={tag}
                  onChange={handleTagChange}
                  required
                />
                <TextField
                  label="Add Image URL"
                  type="url"
                  placeholder="https://www.linktoimage.com"
                  pattern="https://.*"
                  fullWidth
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 3 }}
                  onSubmit={handleSubmit}
                >
                  Create ✨
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default CreatePost;