import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MainFeaturedPost({title, desc, image, link, linkText}) {
  
    return (
      <Paper
        sx={{
          position: 'relative',
          borderRadius: "20px",
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={image} alt="Meal of the Week" />}
        <Box
          sx={{
            position: 'absolute',
            borderRadius: "20px",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container justifyContent="center">
          <Grid item md={11} lg={6} >
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 }, 
                pr: { md: 0 },
                pl: { md: 0 }
              }}
            >
              <Typography variant="h2" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", fontSize: 40}} color="inherit" gutterBottom>
                {title}
              </Typography>
              <Typography variant="" color="inherit" sx={{fontSize: 28}} paragraph>
                {desc}
              </Typography>
              <Paper elevation={11} sx={{backgroundColor: "#fe647d", borderRadius: "20px", width: "28%", display: "inline-block"}}>
              <Link variant="" href={link} sx={{textDecoration: "none", fontStyle: "oblique", fontSize: 26, color: "white"}}>
                {linkText}
              </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  
  export default MainFeaturedPost;