import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { LinearProgress } from '@mui/material';
//import CustomizedSnackbars from '../components/Snackbar';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function SignIn() {

  //Email Address
  const [signInEmail, setSignInEmail] = React.useState('');
  //Password
  const [signInPassword, setSignInPassword] = React.useState('');
  // Error Message
  const [errorMessage, setErrorMessage] = React.useState('');
  // Loading Linear
  const [isLoading, setLoading] = React.useState(false);
  //Open Snackbar
  const [open, setOpen] = React.useState(false);
  //Redirect variable
  const [goToDashboard, setGoToDashboard] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  };


  const handleSubmit = async (event) => {
    setLoading(true);
    const signInInformation = {
      email: signInEmail,
      password: signInPassword,
    };
    event.preventDefault();
    if (signInEmail === '' || signInPassword === '') {
      setErrorMessage("Invalid Input!");
      setLoading(false);
      setOpen(true);
      return;
    }
    const response = await axios.post(`${process.env.REACT_APP_DEPLOYED_API_URL}/login`, signInInformation, {
      withCredentials: true
    });
    if (response.data.code) {
      setErrorMessage(response.data.code);
      setLoading(false);
      setOpen(true);
    } else {
      localStorage.setItem("userData", JSON.stringify(response.data));
      setLoading(false);
      setGoToDashboard(true);
    }

  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/login-image.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fee7e7'
          }}
        >
          <Card sx={{ borderRadius: "0px", backgroundColor: '#f4bd7b' }}>
            <CardHeader title={<Typography variant="h4" sx={{ fontFamily: "unset" }}>On The House 🍜</Typography>} />
          </Card>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setSignInEmail(event.target.value);
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setSignInPassword(event.target.value);
                }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {isLoading ? (<><LinearProgress color='secondary' />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={true}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button></>) : (<>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button></>)}
              <Grid container>
                <Grid item xs>
                  <Link href="forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}