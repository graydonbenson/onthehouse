import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then(res => {
      console.log(res.data);
      setUsers(res.data);
    }).catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>User Emails Below</h2>
      {users.map((user) => <h4>{user.email}</h4>)};
      <Link to={"/login"}><button>Log In!</button></Link>
      <Link to={"/signup"}><button>Sign Up!</button></Link>
    </div>
  );
};

export default HomePage;