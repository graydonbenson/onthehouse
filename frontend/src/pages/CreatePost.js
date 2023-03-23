import { useState } from 'react';
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
} from '@mui/material';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ba68c8',
      },
      secondary: {
        main: '#f50057',
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
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
        <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
        <Box
          component="main"
          sx={{ display: 'flex', flexGrow: 1, p: 3, marginTop: 8 }}
        >
          <Container
            maxWidth="sm"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                height: '110%',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                overflowY: 'scroll', // added scroll
              }}
            >
              <CardHeader title="Upload a New Recipe" />
              <CardContent>
                <PostForm
                  initialTitle=""
                  initialIngredients=""
                  initialDirections=""
                  initialTags=""
                  initialImageUrl=""
                  action="CREATE"
                />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreatePost;
