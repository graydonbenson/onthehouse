import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        OnTheHouse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

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
  // Error Message
  const [errorMessage, setErrorMessage] = React.useState('');
  // Loading Linear
  const [isLoading, setLoading] = React.useState(false);
  //Redirect variable
  const [goToLogin, setGoToLogin] = React.useState(false);
  //Open Snackbar
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //redirect to dashboard
  if (goToLogin) {
    return <Navigate to='/login' />;
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    let signUpInformation = {
      fullName: signUpName,
      email: signUpEmail,
      username: signUpUser,
      password: signUpPassword,
    };
    event.preventDefault();
    if (
      signUpName === '' ||
      signUpEmail === '' ||
      signUpUser === '' ||
      signUpPassword === ''
    ) {
      setErrorMessage('Invalid Input!');
      setLoading(false);
      setOpen(true);
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_DEPLOYED_API_URL}/signup`,
      signUpInformation,
      {
        withCredentials: true,
      }
    );
    if (response.data.code) {
      setErrorMessage(response.data.code);
      setLoading(false);
      setOpen(true);
    } else {
      setLoading(false);
      setGoToLogin(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='fullName'
                  label='Full Name'
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
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(event) => {
                    setSignUpEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  onChange={(event) => {
                    setSignUpUser(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={(event) => {
                    setSignUpPassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {isLoading ? (
              <>
                <LinearProgress color='secondary' />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled='true'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </>
            )}
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </ThemeProvider>
  );
}
