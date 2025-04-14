import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onPlay, onRules, onLeaderboard, onProfile }) => {
  return (
    <div className="home-emu-container">
      <h1 className="gameTitle">PJ-Platform</h1>
      <div className="button-container">
        <button className="homeButton" onClick={onPlay}>Play</button>
        <button className="homeButton" onClick={onRules}>Rules</button>
        <button className="homeButton" onClick={onLeaderboard}>Leaderboard</button>
        <button className="homeButton" onClick={onProfile}>Profile</button>

      </div>
    </div>
  );
};

export default HomeScreen;
