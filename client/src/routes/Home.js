import React from 'react';
import axios from 'axios';
import Community from 'components/Community';
import Friend from 'components/Chat/Friend';
import Navigation from 'components/Navigation';

const Home = () => {
  return (
    <div>
      <div className="home-title">
        <h1>Home Page</h1>
        <hr />
      </div>
      <div>
        <Navigation />
      </div>
      <div className="community-container">
        <Community />
      </div>
      <div>
        <Friend />
      </div>
    </div>
  );
};

export default Home;
