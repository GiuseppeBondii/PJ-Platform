import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SlotTime.css';

// Constants for controller buttons
const BUTTONS = {
  A: 1,
  B: 2,
  START: 3,
  SELECT: 4,
  LEFT: 7,
  RIGHT: 8,
};

// Game configuration settings
const GAME_CONFIG = {
  ANIMATION_DURATION: 5000,
  MULTIPLIERS: [0,0.2,0.5,0.7,0.9, 1,1.2,1.5,1.7,1.9, 2,2.5,2.8, 3,3.5, 3.7, 4,4.5, 5, 6, 7, 8, 9, 10],
  MIN_BET: 1,
};

// Secondary UI Components
const SlotHeader = () => (
  <div className="slot-header">
    <h2 className="pixelated">Slot 2s</h2>
  </div>
);

const BetControls = ({ selectedBet, maxBet }) => (
  <div className="bet-controls pixelated">
    <p>Remaining seconds: {maxBet}</p>
    <div className="bet-selector">
      <span className="bet-label">Selected bet:</span>
      <span className="bet-value">{selectedBet}</span>
    </div>
  </div>
);

const Instructions = () => (
  <div className="instructions pixelated">
    <p>
      Use <span className="button-hint">←/→</span> to change the bet
    </p>
    <p>
      Press <span className="button-hint">J</span> to confirm
    </p>
  </div>
);

const AnimationDisplay = () => (
  <div className="animation-display">
    <div className="slot-reels">
      <div className="reel">
        <div className="symbols-container">
          <div className="symbol red"></div>
          <div className="symbol blue"></div>
          <div className="symbol green"></div>
          <div className="symbol gold"></div>
          <div className="symbol purple"></div>
        </div>
      </div>
      <div className="reel">
        <div className="symbols-container">
          <div className="symbol red"></div>
          <div className="symbol blue"></div>
          <div className="symbol green"></div>
          <div className="symbol gold"></div>
          <div className="symbol purple"></div>
        </div>
      </div>
      <div className="reel">
        <div className="symbols-container">
          <div className="symbol red"></div>
          <div className="symbol blue"></div>
          <div className="symbol green"></div>
          <div className="symbol gold"></div>
          <div className="symbol purple"></div>
        </div>
      </div>
    </div>
  </div>
);
const ResultDisplay = ({ result }) => (
  <div className={`result-display ${result.multiplier > 0 ? 'win' : 'lose'} pixelated`}>
    {result.multiplier > 0 ? (
      <>
        <h3 className="win-title">You won!</h3>
        <p className="win-details">
          <span className="multiplier">×{result.multiplier}</span>
          <span className="winnings">{result.winnings} seconds</span>
        </p>
      </>
    ) : (
      <h3 className="lose-title">You didn't win this time</h3>
    )}
    <p className="continue-hint">Tap to continue...</p>
  </div>
);

function SlotTime({ timeSlot, onSlotComplete, pressedButtons }) {
  const [selectedBet, setSelectedBet] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState('betting'); // 'betting', 'spinning', 'result'
  
  // Use refs to track button state
  const pressedButtonsRef = useRef(pressedButtons);
  const prevPressedButtonsRef = useRef({});
  
  // Update button refs when props change
  useEffect(() => {
    pressedButtonsRef.current = pressedButtons;
  }, [pressedButtons]);
  
  // Initialize bet to minimum or maximum available
  useEffect(() => {
    setSelectedBet(prev => Math.min(Math.max(GAME_CONFIG.MIN_BET, prev), timeSlot));
  }, [timeSlot]);

  // Calculate random result
  const calculateResult = useCallback(() => {
    const multiplier = GAME_CONFIG.MULTIPLIERS[
      Math.floor(Math.random() * GAME_CONFIG.MULTIPLIERS.length)
    ];
    
    return {
      multiplier,
      winnings: multiplier > 0 ? Math.trunc(selectedBet * multiplier) : 0
    };
  }, [selectedBet]);

  // Handle spin animation and result calculation
  const handleSpin = useCallback(() => {
    if (selectedBet <= 0 || selectedBet > timeSlot) return;
    
    setAnimating(true);
    setGameState('spinning');
    
    // Simulate slot machine spinning
    setTimeout(() => {
      const newResult = calculateResult();
      setResult(newResult);
      setAnimating(false);
      setGameState('result');
    }, GAME_CONFIG.ANIMATION_DURATION);
  }, [calculateResult, selectedBet, timeSlot]);

  // Handle controller button inputs
  useEffect(() => {
    if (gameState !== 'betting') return;
    
    const currentButtons = pressedButtonsRef.current || {};
    const prevButtons = prevPressedButtonsRef.current || {};
    
    // Check if a button was just pressed
    const isButtonJustPressed = (buttonCode) => {
      return currentButtons[buttonCode] && !prevButtons[buttonCode];
    };

    if (isButtonJustPressed(BUTTONS.LEFT)) {
      setSelectedBet(prev => Math.max(prev - 1, GAME_CONFIG.MIN_BET));
    } else if (isButtonJustPressed(BUTTONS.RIGHT)) {
      setSelectedBet(prev => Math.min(prev + 1, timeSlot));
    } else if (isButtonJustPressed(BUTTONS.A)) {
      handleSpin();
    }
    
    // Update previous button state reference
    prevPressedButtonsRef.current = { ...currentButtons };
  }, [pressedButtons, gameState, timeSlot, handleSpin]);

  // Handle click to complete game and return to main game flow
  const handleGameComplete = () => {
    if (gameState === 'result') {
      // Calculate new time based on winnings
      const newTimeValue = result.multiplier > 0 ? (result.winnings - selectedBet) : 0 - selectedBet ;
      
      // Call parent callback with the new time value
      onSlotComplete(newTimeValue);
    }
  };

  return (
    <div className={`slot-overlay game-state-${gameState}`} onClick={handleGameComplete}>
      <div className={`slot-container ${animating ? 'animating' : ''}`}>
        <SlotHeader />
        
        {gameState === 'betting' && (
          <>
            <BetControls selectedBet={selectedBet} maxBet={timeSlot} />
            <Instructions />
          </>
        )}
        
        {gameState === 'spinning' && <AnimationDisplay />}
        
        {gameState === 'result' && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default SlotTime;
