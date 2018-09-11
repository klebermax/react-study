import React from 'react';
import Feature from './featured';
import Matches from './matches';
import MeetPlayers from './meetPlayers';

const Home = () => {
  return (
    <div className="bck_blue">
      <Feature />
      <Matches />
      <MeetPlayers />
    </div>
  );
};

export default Home;
