import React from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 
import Comments from '../components/Comments';
import { Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

function PostPage() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
    <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
    <Box component="main" 
        sx={{  mt: 15, mb: 15, ml: 15, width: 650, height: 700, backgroundColor: '#def9f5' }}
        style={{ alignItems: "center", justifyContent: "center" }}>
        <Typography paragraph>
          Chicken Parmegiano
        </Typography>
        <Box component="img"
            sx={{
                width: 600
            }}
            src="https://media.cnn.com/api/v1/images/stellar/prod/211006114703-best-meal-delivery-service-freshly.jpg?q=w_1601,h_900,x_0,y_0,c_fill">    
        </Box>
        <Box sx={{ flexGrow: 1, mt: 1 }} style={{ display: "flex"}}>
          <Avatar sx={{ bgcolor: "red", width: 30, height: 30, ml: 3}} aria-label="recipe">
            R
          </Avatar>
          <Typography sx={{ ml: 2 }}>Rodrygo</Typography>
          <IconButton aria-label="Upvote Recipe" sx={{ ml: 52 }}>
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="Downvote Recipe">
            <ThumbDownIcon />
          </IconButton>
        </Box>
        <Typography sx={{ mt: 2, ml: 3, mr: 3, textAlign: "justify"}} paragraph>Ingredients: 
            Chicken, shrimp and chorizo pimentón, bay leaves, garlic, tomatoes, onion,
             salt and pepper, 4 1/2 cups chicken broth; bring to a boil.</Typography>
        <Typography sx={{ ml: 3, mr: 3, textAlign: "justify"}} paragraph>Method: 
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.</Typography>
    </Box>
    <Box component="main" 
        sx={{ mt: 15, mb: 15, pr: 10 }}
        style={{ alignItems: "center", justifyContent: "center" }}>
            <Grid>
                <Comments />
            </Grid>
            <Grid>
                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{ width: 360}}
                    />
                </div>
                <IconButton aria-label="Send Comment" >
                    <SendIcon />
                </IconButton>
            </Grid>
    </Box>
    </Box>
    </>
  )
}

export default PostPage;