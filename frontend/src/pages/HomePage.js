import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {

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
      <h1>Home Page</h1>
      <h2>User Emails Below</h2>
      {loading ? (<h4>Loading Data Please Wait....</h4>) : (<div>{users.map((user) => <h4>{user.email}</h4>)}</div>)};
      <Link to={"/login"}><button>Log In!</button></Link>
      <Link to={"/signup"}><button>Sign Up!</button></Link>
    </div>
  );
};

export default HomePage;