import React from 'react'
import { useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => { navigate("/"); }}>Home</button>
      <button onClick={() => { navigate("/signup"); }}>Sign Up</button>
    </div>
  );
};

export default LoginPage;