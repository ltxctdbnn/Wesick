import React from 'react';

import Community from '../component/Community';
import Friend from '../component/Friend';
import Navigation from '../component/Navigation';


// 홈 페이지
const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="home-title">
        <h1>토닥토닥</h1>
        <hr />
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
