import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        OnTheHouse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpPage() {
  
  //const navigate = useNavigate;
  //First Name
  const [signUpName, setSignUpName] = React.useState('');
  //Email Address
  const [signUpEmail, setSignUpEmail] = React.useState('');
  //Username
  const [signUpUser, setSignUpUser] = React.useState('');
  //Password
  const [signUpPassword, setSignUpPassword] = React.useState('');
  
  const [goToLogin, setGoToLogin] = React.useState(false);
  
  
  // const handleSubmit = (event) => {
    
  //   let variable = {
  //     fullName: signUpName,
  //     email: signUpEmail,
  //     username: signUpUser,
  //     password: signUpPassword,
  //   };
  //   event.preventDefault();
  //   axios.post("/signup", variable).then((response) =>{
  //     if (response.data.errMessage) {
  //       alert(response.data.errMessage);
  //       console.log("error");
  //     } else {
  //       if (response.data.successMessage) {
  //         console.log("success");
  //         //return <Navigate to="/login" />
  //         //window.location.reload();
  //       }
  //     }
  //   });
  // };

  if (goToLogin){
    return <Navigate to="/login" />;
  }
  const handleSubmit = async (event) => {
    
    let signUpInformation = {
      fullName: signUpName,
      email: signUpEmail,
      username: signUpUser,
      password: signUpPassword,
    };
    event.preventDefault();
    try{
      const response = await axios.post("/signup", signUpInformation);
      //console.log("success");
      if (response.status === 200){
        //console.log("success");
        //return <Navigate to="/login" />;
        setGoToLogin(true);
      }
    } catch (error){
      console.log("success");
      console.error(error);
    }
    
    
    // if (response.data.errMessage) {
      //   alert(response.data.errMessage);
      //   console.log("error");
      // } else {
      //   if (response.data.successMessage) {
      //     console.log("success");
      //     //return <Navigate to="/login" />
      //     //window.location.reload();
      //   }
      // }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={(event) => {
                    setSignUpName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setSignUpEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(event) => {
                    setSignUpUser(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setSignUpPassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography component="body1" variant="body2">
              By signing up, you agree to our Terms, Privacy Policy and Cookies Policy
              </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}