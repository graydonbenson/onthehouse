import React from 'react'
import { Link } from 'react-router-dom';

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <Link to={"/login"}><button>Log In!</button></Link>
      <Link to={"/"}><button>Back To Home</button></Link>
    </div>
  );
};

export default SignUpPage;