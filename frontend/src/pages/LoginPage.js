import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    axios.get("/users").then(res => {
      console.log(res.data);
      setUsers(res.data);
      setLoading(false);
    }).catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <h2>User Emails Below</h2>
      {loading ? (<h4>Loading Data Please Wait....</h4>) : (<div>{users.map((user) => <h4>{user.email}</h4>)}</div>)};
      <Link to={"/"}><button>Back To Home</button></Link>
      <Link to={"/signup"}><button>Sign Up!</button></Link>
    </div>
  );
};

export default LoginPage;