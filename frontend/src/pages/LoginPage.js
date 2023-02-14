import React from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to={"/"}><button>Back To Home</button></Link>
      <Link to={"/signup"}><button>Sign Up!</button></Link>
    </div>
  );
};

export default LoginPage;