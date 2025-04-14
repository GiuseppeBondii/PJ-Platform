import React from 'react';
import './Rules.css';

const Rules = ({ onBack }) => {
  return (
    <div className="home-emu-container">
      <h1 className="gameTitle">Rules</h1>
      <div className="rulesContent">
        <p>
        Objective:
            <li>The player must jump onto white platforms to progress to the next level.​</li>
            <br />
        Gameplay Mechanics:
        <li> Starting Time: 30 seconds.​</li>
        <br />

        Level Progression:
        <li>Upon reaching a new level, 10 seconds are added to the remaining time.​</li>
        <br />

        Penalty:
        <li>Jumping onto a blue platform deducts 5 seconds from the available time.​</li>
        <br />

        Neutral Platforms:
        <li>Orange platforms have no effect on the timer.​</li>
        <br />

        Betting System:
        <li>Every 10 levels, the player has the opportunity to wager their remaining time in a feature called "Slot 2s" to potentially gain additional time.​
        Game Over Condition:</li>
        <br />
        The game ends when the timer reaches zero.​
        </p>
      </div>
      <button className="homeButton" onClick={onBack}>Back To Home</button>
    </div>
  );
};

export default Rules;
