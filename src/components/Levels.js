import React from "react";

// Definizione dei tipi di elementi e delle geometrie di livello
export const LEVEL_TYPES = {
  PLATFORM: "platform",     // Piattaforma standard
  MOVING: "moving",         // Piattaforma mobile
  BOUNCE: "bounce",         // Piattaforma rimbalzante
  ENEMY: "enemy",           // Nemico
  COLLECTABLE: "coin",      // Oggetto collezionabile
  FINISH: "finish",         // Traguardo
  SPIKE: "spike",           // Punta per danni
  DISAPPEARING: "disappear" // Piattaforma che scompare al contatto
};

export const GAME_LEVELS = [
  {
    name: "First Steps",
    description: "Learn the basics of movement and jumping",
    startPosition: { x: 10, y: 10 },
    backgroundColor: "#87CEEB",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 100, height: 10 },
      { type: LEVEL_TYPES.PLATFORM, x: 30, y: 20, width: 40, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 80, y: 30, width: 20, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 50, y: 30 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 85, y: 40 },
      { type: LEVEL_TYPES.FINISH, x: 90, y: 35 }
    ],
    hints: [
      "Use LEFT and RIGHT to move",
      "Press A to jump",
      "Reach the finish flag"
    ]
  },
  {
    name: "Stepping Stones",
    description: "Practice your jumping precision",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#ADD8E6",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 25, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 50, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 75, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 30, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 55, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 80, y: 10 },
      { type: LEVEL_TYPES.FINISH, x: 85, y: 5 }
    ],
    hints: [
      "Time your jumps carefully",
      "Momentum is key for longer jumps"
    ]
  },
  {
    name: "Vertical Challenge",
    description: "Climb to the top",
    startPosition: { x: 10, y: 5 },
    backgroundColor: "#B0E0E6",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 30, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 40, y: 15, width: 20, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 10, y: 30, width: 20, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 40, y: 45, width: 20, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 10, y: 60, width: 20, height: 5 },
      { type: LEVEL_TYPES.PLATFORM, x: 40, y: 75, width: 60, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 45, y: 25 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 15, y: 40 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 45, y: 55 },
      { type: LEVEL_TYPES.FINISH, x: 90, y: 80 }
    ],
    hints: [
      "Focus on climbing higher",
      "Don't rush your jumps"
    ]
  },
  {
    name: "Shifting Ground",
    description: "Master the moving platforms",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#AFEEEE",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 20, height: 5 },
      { type: LEVEL_TYPES.MOVING, x: 30, y: 10, width: 20, height: 5, moveX: 30, moveY: 0, speed: 1 },
      { type: LEVEL_TYPES.PLATFORM, x: 80, y: 0, width: 20, height: 5 },
      { type: LEVEL_TYPES.MOVING, x: 30, y: 30, width: 20, height: 5, moveX: 0, moveY: 20, speed: 1.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 60, y: 40, width: 20, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 40, y: 20 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 40, y: 50 },
      { type: LEVEL_TYPES.FINISH, x: 70, y: 45 }
    ],
    hints: [
      "Time your jumps with platform movement",
      "Wait for the right moment to jump"
    ]
  },
  {
    name: "Bounce House",
    description: "Use bouncy platforms to reach new heights",
    startPosition: { x: 10, y: 10 },
    backgroundColor: "#E0FFFF",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 30, height: 5 },
      { type: LEVEL_TYPES.BOUNCE, x: 40, y: 0, width: 20, height: 5, power: 1.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 70, y: 30, width: 30, height: 5 },
      { type: LEVEL_TYPES.BOUNCE, x: 20, y: 20, width: 15, height: 5, power: 2 },
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 50, width: 20, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 45, y: 20 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 80, y: 40 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 10, y: 60 },
      { type: LEVEL_TYPES.FINISH, x: 15, y: 55 }
    ],
    hints: [
      "Bounce pads give you extra height",
      "Hold A while bouncing for maximum height"
    ]
  },
  {
    name: "Obstacle Course",
    description: "Avoid enemies and spikes",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#F0F8FF",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 100, height: 5 },
      { type: LEVEL_TYPES.ENEMY, x: 30, y: 5, width: 5, height: 5, moveX: 20, moveY: 0, speed: 1 },
      { type: LEVEL_TYPES.SPIKE, x: 60, y: 5, width: 10, height: 3 },
      { type: LEVEL_TYPES.PLATFORM, x: 20, y: 20, width: 60, height: 5 },
      { type: LEVEL_TYPES.ENEMY, x: 50, y: 25, width: 5, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 35, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 65, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 40, y: 30 },
      { type: LEVEL_TYPES.FINISH, x: 75, y: 25 }
    ],
    hints: [
      "Avoid enemies and spikes",
      "Timing is everything"
    ]
  },
  {
    name: "Now You See Me",
    description: "Cross quickly before platforms disappear",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#F0FFFF",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 25, y: 0, width: 15, height: 5, timeout: 1000 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 50, y: 0, width: 15, height: 5, timeout: 1000 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 75, y: 0, width: 15, height: 5, timeout: 1000 },
      { type: LEVEL_TYPES.PLATFORM, x: 95, y: 0, width: 5, height: 20 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 30, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 55, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 80, y: 10 },
      { type: LEVEL_TYPES.FINISH, x: 95, y: 25 }
    ],
    hints: [
      "Move quickly across disappearing platforms",
      "Don't stop moving"
    ]
  },
  {
    name: "Precision Timing",
    description: "Time your movements perfectly",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#E6E6FA",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.MOVING, x: 25, y: 10, width: 15, height: 5, moveX: 0, moveY: 20, speed: 2 },
      { type: LEVEL_TYPES.SPIKE, x: 25, y: 40, width: 15, height: 3 },
      { type: LEVEL_TYPES.MOVING, x: 50, y: 20, width: 15, height: 5, moveX: 0, moveY: 20, speed: 2.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 75, y: 30, width: 25, height: 5 },
      { type: LEVEL_TYPES.ENEMY, x: 85, y: 35, width: 5, height: 5, moveX: 10, moveY: 0, speed: 1.5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 30, y: 20 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 55, y: 30 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 80, y: 40 },
      { type: LEVEL_TYPES.FINISH, x: 90, y: 35 }
    ],
    hints: [
      "Watch the patterns of moving platforms",
      "Time your jumps to avoid spikes"
    ]
  },
  {
    name: "Complex Combination",
    description: "Use all your skills together",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#D8BFD8",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 20, height: 5 },
      { type: LEVEL_TYPES.BOUNCE, x: 30, y: 0, width: 10, height: 5, power: 2 },
      { type: LEVEL_TYPES.PLATFORM, x: 50, y: 30, width: 20, height: 5 },
      { type: LEVEL_TYPES.ENEMY, x: 60, y: 35, width: 5, height: 5, moveX: 5, moveY: 0, speed: 1 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 80, y: 30, width: 10, height: 5, timeout: 800 },
      { type: LEVEL_TYPES.MOVING, x: 40, y: 50, width: 20, height: 5, moveX: 40, moveY: 0, speed: 1.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 90, y: 60, width: 10, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 35, y: 15 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 65, y: 40 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 60, y: 60 },
      { type: LEVEL_TYPES.FINISH, x: 95, y: 65 }
    ],
    hints: [
      "Use bouncy platforms to reach higher areas",
      "Time your jumps across disappearing platforms",
      "Avoid enemies while navigating moving platforms"
    ]
  },
  {
    name: "The Final Challenge",
    description: "Put all your skills to the test",
    startPosition: { x: 5, y: 10 },
    backgroundColor: "#DDA0DD",
    elements: [
      { type: LEVEL_TYPES.PLATFORM, x: 0, y: 0, width: 15, height: 5 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 25, y: 0, width: 10, height: 5, timeout: 700 },
      { type: LEVEL_TYPES.SPIKE, x: 45, y: 0, width: 10, height: 3 },
      { type: LEVEL_TYPES.PLATFORM, x: 65, y: 0, width: 10, height: 5 },
      { type: LEVEL_TYPES.MOVING, x: 20, y: 20, width: 15, height: 5, moveX: 0, moveY: 20, speed: 2 },
      { type: LEVEL_TYPES.ENEMY, x: 50, y: 25, width: 5, height: 5, moveX: 20, moveY: 0, speed: 2 },
      { type: LEVEL_TYPES.BOUNCE, x: 80, y: 10, width: 10, height: 5, power: 2.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 50, y: 50, width: 20, height: 5 },
      { type: LEVEL_TYPES.MOVING, x: 80, y: 60, width: 15, height: 5, moveX: 0, moveY: 20, speed: 1.5 },
      { type: LEVEL_TYPES.PLATFORM, x: 40, y: 70, width: 10, height: 5 },
      { type: LEVEL_TYPES.DISAPPEARING, x: 60, y: 80, width: 10, height: 5, timeout: 600 },
      { type: LEVEL_TYPES.PLATFORM, x: 80, y: 90, width: 20, height: 5 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 30, y: 10 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 55, y: 35 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 85, y: 50 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 45, y: 80 },
      { type: LEVEL_TYPES.COLLECTABLE, x: 85, y: 100 },
      { type: LEVEL_TYPES.FINISH, x: 90, y: 95 }
    ],
    hints: [
      "This is the ultimate test of your skills",
      "Use all techniques you've learned",
      "Stay calm and observe patterns before jumping"
    ]
  }
];

// Funzione helper per generare lo stile inline dell'elemento
const getElementStyle = ({ x, y, width, height }) => {
  const style = { left: `${x}%`, bottom: `${y}%` };
  if (width !== undefined) style.width = `${width}%`;
  if (height !== undefined) style.height = `${height}%`;
  return style;
};

// Mappa per associare i tipi alle classi CSS
const typeClassMap = {
  [LEVEL_TYPES.PLATFORM]: "platform",
  [LEVEL_TYPES.MOVING]: "platform moving",
  [LEVEL_TYPES.BOUNCE]: "platform bounce",
  [LEVEL_TYPES.COLLECTABLE]: "collectable",
  [LEVEL_TYPES.FINISH]: "finish",
  [LEVEL_TYPES.ENEMY]: "enemy",
  [LEVEL_TYPES.SPIKE]: "spike",
  [LEVEL_TYPES.DISAPPEARING]: "platform disappearing"
};

// Componente per il rendering del livello
export const LevelRenderer = ({ level }) => {
  const { backgroundColor, name, description, elements } = level;
  return (
    <div className="level-container" style={{ backgroundColor }}>
      <h2 className="level-name">{name}</h2>
      <p className="level-description">{description}</p>
      {elements.map((element, index) => {
        const className = typeClassMap[element.type];
        if (!className) return null;
        return (
          <div
            key={index}
            className={className}
            style={getElementStyle(element)}
          />
        );
      })}
    </div>
  );
};

// Componente per gestire la visualizzazione delle informazioni del livello
export const GameLevelManager = ({ currentLevel = 0 }) => {
  const level = GAME_LEVELS[currentLevel];
  return (
    <div className="game-container">
      <div className="level-info">
        <h3>
          Level {currentLevel + 1}: {level.name}
        </h3>
        <p>{level.description}</p>
      </div>
      <LevelRenderer level={level} />
      <div className="level-hints">
        <h4>Hints:</h4>
        <ul>
          {level.hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
