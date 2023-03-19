import { useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Box
} from "@mui/material";
import PostForm from '../components/PostForm';

function CreatePost() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
              <PostForm initialTitle='' initialDesc='' initialTags='' initialImageUrl=''/>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default CreatePost;