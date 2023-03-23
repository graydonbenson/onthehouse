import axios from 'axios';
import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MainFeaturedPost(props) {
    const { post } = props;
  
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
          backgroundImage: `url(${post.image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
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
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography variant="h2" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique", fontSize: 40}} color="inherit" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="" color="inherit" sx={{fontSize: 28}} paragraph>
                {post.description}
              </Typography>
              <Paper elevation={11} sx={{backgroundColor: "#fe647d", borderRadius: "20px", width: "28%", display: "inline-block"}}>
              <Link variant="" href="#" sx={{textDecoration: "none", fontStyle: "oblique", fontSize: 26, color: "white"}}>
                {post.linkText}
              </Link>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  
  MainFeaturedPost.propTypes = {
    post: PropTypes.shape({
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      imageText: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  export default MainFeaturedPost;