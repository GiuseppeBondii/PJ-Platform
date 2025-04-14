import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ onBack }) => {
  return (
    <div className="home-emu-container">
      <h1 className="gameTitle">Leaderboard</h1>
      <div className="leaderboardContent">
        <p>Coming soon...</p>
      </div>
      <button className="homeButton" onClick={onBack}>Back To Home</button>
    </div>
  );
};

export default Leaderboard;
