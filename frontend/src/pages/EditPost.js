import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Box,
    createTheme,
    ThemeProvider
} from "@mui/material";
import PostForm from '../components/PostForm';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const params = useParams();

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

    const [open, setOpen] = useState(false);
    const [post, setPost] = useState({});

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`);
            const json = await response.json();
            if (response.ok) {
                setPost(json);
            } else {
                console.log("did not work")
            }
        }

        fetchPost();
    }, [params.id]);

    return (
        <ThemeProvider theme={theme}>
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
                        <CardHeader title="Edit Your Recipe" />
                        <CardContent>
                            {post &&
                                <PostForm
                                    initialTitle={post.title}
                                    initialIngredients={post.ingredients}
                                    initialDirections={post.directions}
                                    initialTags={post.flair}
                                    initialImageUrl={post.image}
                                    action='UPDATE'
                                />
                            }
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
};

export default EditPost;