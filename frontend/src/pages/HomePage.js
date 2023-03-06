import React from 'react';
import { Link } from "react-router-dom";
import videoSrc from "../media/production_ID_4253147.mp4";
import "./HomePage.css";


function HomePage() {
  return (
    <>
      <video src={videoSrc} autoPlay loop muted/>
      <div className='info'>
        <h1>On The House</h1>
        <h6 className='phrase'>Find your next meal.</h6>
        <div>
          <Link to={"/login"}><button className="homeButtons">Log In!</button></Link>
          <Link to={"/signup"}><button className="homeButtons">Sign Up!</button></Link>
          <Link to={"/test"}><button className="homeButtons">TestPage</button></Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;