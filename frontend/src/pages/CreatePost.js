import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  Backdrop,
  Typography
} from "@mui/material";
import PostForm from '../components/PostForm';
import axios from 'axios';

const CreatePost = () => {
  const [open, setOpen] = useState(false);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: "#fee7e7" }}>
      <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
      <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Card sx={{borderRadius: "20px"}}>
          <CardHeader title={<Typography variant="h4" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique"}}>Upload Your Own Recipe</Typography>}/>
            <CardContent>
              <PostForm initialTitle='' initialIngredients='' initialDirections='' initialTags='' initialImageUrl='' action='CREATE' />
            </CardContent>
          </Card>
        </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreatePost;