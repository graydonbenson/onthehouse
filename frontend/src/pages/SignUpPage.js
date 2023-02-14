import React from 'react'
import { useNavigate } from 'react-router';

function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sign Up Page</h1>
      <button onClick={() => { navigate("/login"); }}>Login</button>
      <button onClick={() => { navigate("/"); }}>Home</button>
    </div>
  );
};

export default SignUpPage;