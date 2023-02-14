import React from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => { navigate("/login"); }}>Login</button>
      <button onClick={() => { navigate("/signup"); }}>Sign Up</button>
    </div>
  );
};

export default HomePage;