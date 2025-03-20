import React, { useState, useEffect, useRef } from "react";
import "./EmuSchermo.css";

const maxHorizontalSpeed = 1.2;
const jumpVelocity = 6;
const gravity = -0.5;

const BUTTONS = {
  A: 1,
  B: 2,
  START: 3,
  SELECT: 4,
  LEFT: 7,
  RIGHT: 8,
};

// Parametri per la generazione
const screenHeight = 80; // Altezza massima dello schermo
const maxX = 100;        // Larghezza massima orizzontale
const minWidth = 10;
const maxWidth = 30;
const minVertical = 5;
const maxVertical = 20;
const marginSafety = 1;  // Margine di sicurezza orizzontale per il salto

// Parametri per la generazione pseudo-casuale


function createSeededRandom(seed) {
  const a = Math.floor(Math.random() * 10000000000);
  const c = Math.floor(Math.random() * 10000000000);
  const m = 2 ** 32;
  let state = seed;
  return function () {
    state = (a * state + c) % m;
    return state / m;
  };
}

// Funzione che calcola il tempo di volo disponibile per un salto data la differenza verticale dy
function getFlightTime(dy) {
  // Se il target è sopra (dy > 0) il tempo di volo è minore
  if (dy > 0) {
    // Risolve: 0.5*gravity*t^2 + jumpVelocity*t - dy = 0
    // Poiché gravity è negativo, usiamo la formula corretta per ottenere il tempo positivo
    return (jumpVelocity + Math.sqrt(jumpVelocity * jumpVelocity + (-2 * gravity * dy))) / (-gravity);
  } else {
    // Se il target è allo stesso livello o più in basso, consideriamo il tempo d'aria massimo (salto completo)
    return 2 * jumpVelocity / (-gravity);
  }
}

// Calcola la distanza orizzontale massima raggiungibile per una data differenza verticale dy
function getMaxHorizontalDistance(dy) {
  const t = getFlightTime(dy);
  return maxHorizontalSpeed * t;
}

function generateLevel(seed) {
  const rand = createSeededRandom(seed);
  const platforms = [];

  // Genera la piattaforma di partenza (base)
  const baseHeight = 15;
  const firstWidth = Math.floor(rand() * (maxWidth - minWidth + 1)) + minWidth;
  const firstPosStartX = Math.floor(rand() * (maxX - firstWidth));
  const firstPosEndX = firstPosStartX + firstWidth;
  platforms.push({
    type: 'p',
    height: baseHeight,
    posStartX: firstPosStartX,
    posEndX: firstPosEndX
  });

  let prev = platforms[0];

  // Genera piattaforme intermedie fino a rimanere entro screenHeight
  // L'ultima piattaforma verrà forzata ad essere il traguardo (T)
  while (true) {
    // Scegli un incremento verticale che non superi l'altezza massima dello schermo
    const verticalIncrement = Math.floor(rand() * (maxVertical - minVertical + 1)) + minVertical;
    const newHeight = prev.height + verticalIncrement;
    if (newHeight > screenHeight - 10) { 
      // Se il prossimo salto supererebbe quasi lo screenHeight, usciamo dal ciclo.
      break;
    }
    
    // Calcola la distanza massima orizzontale raggiungibile per questo salto
    const maxReach = getMaxHorizontalDistance(verticalIncrement) - marginSafety;
    
    // Per sicurezza, limitiamo il gap tra le piattaforme a un valore ragionevole (almeno 2 e al massimo quanto raggiungibile o un valore fisso)
    const gap = Math.floor(Math.min(
      (rand() * (maxReach - 2) + 2),
      13  // oppure si può usare 13 se si preferisce una soglia fissa
    ));
    
    // Scegli casualmente la direzione: 1 = a destra, -1 = a sinistra
    let direction = rand() < 0.5 ? 1 : -1;
    let posStartX;
    
    if (direction === 1) {
      // Prova a posizionare a destra della precedente piattaforma
      if (prev.posEndX + gap + minWidth <= maxX) {
        posStartX = prev.posEndX + gap;
      } else if (prev.posStartX - gap - minWidth >= 0) {
        // Se non c'è spazio a destra, prova a sinistra
        direction = -1;
        posStartX = prev.posStartX - gap - minWidth;
      } else {
        // Forza il posizionamento in caso di spazio ristretto
        posStartX = Math.max(0, maxX - minWidth);
      }
    } else {
      // Prova a posizionare a sinistra della precedente
      if (prev.posStartX - gap - minWidth >= 0) {
        posStartX = prev.posStartX - gap - minWidth;
      } else if (prev.posEndX + gap + minWidth <= maxX) {
        // Se non c'è spazio a sinistra, prova a destra
        direction = 1;
        posStartX = prev.posEndX + gap;
      } else {
        posStartX = 0;
      }
    }
    
    // La larghezza della piattaforma la scegliamo casualmente entro i limiti, senza superare il bordo
    const width = Math.min(
      Math.floor(rand() * (maxWidth - minWidth + 1)) + minWidth,
      maxX - posStartX
    );
    const posEndX = posStartX + width;
    
    // Determina il tipo: di default è "p" (hazard), ma c'è una possibilità del 20% di aggiungere spike (tipo "s")
    let type = "p";
    if (rand() < 0.3 + (seed / 50)) {
      type = "s";
    }
    
    const platform = {
      type,
      height: newHeight,
      posStartX,
      posEndX
    };
    platforms.push(platform);
    prev = platform;
  }
  
  // Aggiungi la piattaforma finale "T" (traguardo) in una posizione raggiungibile dall'ultima piattaforma
  // Per farlo, scegliamo un incremento verticale che faccia rimanere il traguardo entro lo screenHeight
  const remainingVertical = screenHeight - prev.height;
  // Se remainingVertical è troppo piccolo, possiamo impostare un piccolo incremento
  const finalVerticalIncrement = remainingVertical > minVertical ? 
    Math.floor(rand() * (Math.min(maxVertical, remainingVertical) - minVertical + 1)) + minVertical :
    remainingVertical;
  const newHeight = prev.height + finalVerticalIncrement;
  const maxReach = getMaxHorizontalDistance(finalVerticalIncrement) - marginSafety;
  const gap = Math.floor(Math.min((rand() * (maxReach - 2) + 2), 13));
  let direction = rand() < 0.5 ? 1 : -1;
  let posStartX;
  
  if (direction === 1) {
    if (prev.posEndX + gap + minWidth <= maxX) {
      posStartX = prev.posEndX + gap;
    } else if (prev.posStartX - gap - minWidth >= 0) {
      direction = -1;
      posStartX = prev.posStartX - gap - minWidth;
    } else {
      posStartX = Math.max(0, maxX - minWidth);
    }
  } else {
    if (prev.posStartX - gap - minWidth >= 0) {
      posStartX = prev.posStartX - gap - minWidth;
    } else if (prev.posEndX + gap + minWidth <= maxX) {
      direction = 1;
      posStartX = prev.posEndX + gap;
    } else {
      posStartX = 0;
    }
  }
  
  const width = Math.min(
    Math.floor(rand() * (maxWidth - minWidth + 1)) + minWidth,
    maxX - posStartX
  );
  const posEndX = posStartX + width;
  
  // La piattaforma finale è il traguardo "T"
  platforms.push({
    type: "T",
    height: newHeight,
    posStartX,
    posEndX
  });
  
  return platforms;
}



function EmuSchermo({ pressedButtons }) {
  const ballSize = 4;
  const horizontalAcceleration = 0.2;
  const maxHorizontalSpeed = 1.2;
  const friction = 0.1;
  const jumpVelocity = 6;
  const gravity = -0.5;

  // Stato di gioco: "countdown", "playing", "gameOver"
  const [gameState, setGameState] = useState("countdown");
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [record, setRecord] = useState(0);


  const [level, setLevel] = useState(1);
  const [LEVEL, SETLEVEL] = useState(generateLevel(1));
  const platformsRef = useRef(LEVEL);
  useEffect(() => {
    platformsRef.current = LEVEL;
  }, [LEVEL]);

  const [ball, setBall] = useState({
    x: 2,
    y: 0,
    vx: 0,
    vy: 0,
  });

  const pressedButtonsRef = useRef(pressedButtons);
  useEffect(() => {
    pressedButtonsRef.current = pressedButtons;
  }, [pressedButtons]);

  const animationFrameId = useRef(null);



  function renderImpact(x, y) {
    return (
      <div
        style={{
          position: 'absolute', // Posizionamento assoluto
          left: `${x}%`,        // Posizione orizzontale in percentuale
          bottom: `${y}%`,      // Posizione verticale in percentuale
          height: `${ballSize + 5}%`,
        }}
      >
        - 10 s
      </div>
    );
  }
  

  // Countdown iniziale di 3 secondi
  useEffect(() => {
    if (gameState === "countdown") {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setGameState("playing");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [gameState]);

  // Timer di gioco: decrementa ogni secondo durante il gioco
  useEffect(() => {
    if (gameState === "playing") {
      const timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setGameState("gameOver");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [gameState]);

  // Loop di aggiornamento del gioco (solo se in stato "playing")
  useEffect(() => {
    if (gameState !== "playing") return;
    
    const update = () => {
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        const currentPressedButtons = pressedButtonsRef.current || {};

        // Gestione input orizzontale
        if (currentPressedButtons[BUTTONS.LEFT]) vx -= horizontalAcceleration;
        if (currentPressedButtons[BUTTONS.RIGHT]) vx += horizontalAcceleration;
        if (!currentPressedButtons[BUTTONS.LEFT] && !currentPressedButtons[BUTTONS.RIGHT]) {
          vx = vx > 0 ? Math.max(vx - friction, 0) : Math.min(vx + friction, 0);
        }
        vx = Math.min(Math.max(vx, -maxHorizontalSpeed), maxHorizontalSpeed);

        // Controllo per permettere il salto (a terra o su piattaforma)
        const isOnGroundOrPlatform =
          y === 0 ||
          platformsRef.current.some(p => {
            const platformTop = p.height + 2;
            const horizontalOverlap = (
              x <= p.posEndX &&
              (x + ballSize) >= p.posStartX
            );
            return y === platformTop && horizontalOverlap;
          });

        if (currentPressedButtons[BUTTONS.A] && isOnGroundOrPlatform) {
          vy = jumpVelocity;
        }

        vy += gravity;
        let newY = y + vy;
        let newX = x + vx;

        // Collisione base con piattaforme (aterraggio/scontro)
        let collided = false;
        platformsRef.current.forEach(platform => {
          const platformTop = platform.height + 2;
          const platformBottom = platform.height;
          const horizontalOverlap = (
            newX < platform.posEndX &&
            (newX + ballSize) > platform.posStartX
          );
          const verticalOverlap = (
            newY <= platformTop &&
            (newY + ballSize) >= platformBottom
          );
          if (horizontalOverlap && verticalOverlap) {
            const prevBottom = y + ballSize;
            if (prevBottom <= platformBottom && vy > 0) {
              // Salto contro la piattaforma
              newY = platformBottom - ballSize;
              vy = 0;
            } else if (vy <= 0) {
              // Atterraggio sulla piattaforma
              newY = platformTop;
              vy = 0;
            }
            collided = true;
          }
        });
        if (!collided && newY < 0) {
          newY = 0;
          vy = 0;
        }
        newX = Math.max(0, Math.min(newX, 100 - ballSize));

        // Gestione collisione con spike ("s") e traguardo ("T")
        for (const platform of platformsRef.current) {
          if (platform.type === "s") {
            const spikeLeft = platform.posStartX;
            const spikeRight = platform.posEndX;
            const spikeBottom = platform.height;
            const spikeTop = platform.height + 3;
            const horizontalCollision = (x + ballSize > spikeLeft && x < spikeRight);
            const verticalCollision = (y < spikeTop && y + ballSize > spikeBottom && vy <= 0);
            if (horizontalCollision && verticalCollision) {
              setTimeLeft(prev => prev - 10);
              renderImpact(x,y)
              platform.type = "p";
              break;
            }
          } else if (platform.type === "T") {
            const goalLeft = platform.posStartX;
            const goalRight = platform.posEndX;
            const goalBottom = platform.height;
            const goalTop = platform.height + 3;
            const horizontalCollision = (x + ballSize > goalLeft && x < goalRight);
            const verticalCollision = (y < goalTop && y + ballSize > goalBottom && vy <= 0);
            if (horizontalCollision && verticalCollision) {
              // Aggiunge 15 secondi e passa al livello successivo
              setTimeLeft(prev => prev + 5);
              const newLevel = level + 1;
              setLevel(newLevel);
              SETLEVEL(generateLevel(newLevel));
              newX = 2;
              newY = 0;
              vx = 0;
              vy = 0;
              break;
            }
          }
        }

        return { x: newX, y: newY, vx, vy };
      });
      animationFrameId.current = requestAnimationFrame(update);
    };

    animationFrameId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameState, level, ballSize, horizontalAcceleration, friction, maxHorizontalSpeed, jumpVelocity, gravity]);

  // Funzione per ripartire la partita (Play Again)
  const handlePlayAgain = () => {
    setLevel(1);
    SETLEVEL(generateLevel(1));
    setBall({ x: 2, y: 0, vx: 0, vy: 0 });
    setTimeLeft(30);
    setCountdown(3);
    setGameState("countdown");
  };

  useEffect(() => {
    if (gameState === "gameOver") {
      const storedRecord = localStorage.getItem("record") ? parseInt(localStorage.getItem("record"), 10) : 0;
      if (level > storedRecord) {
        localStorage.setItem("record", level);
        setRecord(level);
      } else {
        setRecord(storedRecord);
      }
    }
  }, [gameState, level]);

  return (
    <div className="emu-container">
      {/* Overlay per il countdown iniziale */}
      {gameState === "countdown" && (
        <div className="countdown-overlay">
          <h1>{countdown}</h1>
        </div>
      )}

    {/* Overlay Game Over */}
    {gameState === "gameOver" && (
        <div className="gameover-overlay">
          <h1>Game Over</h1>
          <p>Livello raggiunto: {level}</p>
          <p>Record: {record}</p>
          <button className="playAgainButton" onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}

      {/* HUD durante il gioco */}
      {gameState === "playing" && (
        <div className="hud">
          <p>Time: {timeLeft}</p>
          <p>Level: {level}</p>
        </div>
      )}

      <div
        className="ball"
        style={{
          left: `${ball.x}%`,
          bottom: `${ball.y}%`,
          width: `${ballSize}%`,
          height: `${ballSize + 2}%`,
        }}
      ></div>

      {LEVEL.map((item, i) => {
        if (item.type === "T") {
          return (
            <div
              key={i}
              className="t-platform"
              style={{
                left: `${item.posStartX}%`,
                width: `${item.posEndX - item.posStartX}%`,
                bottom: `${item.height}%`,
                height: "2%",
              }}
            />
          );
        } else if (item.type === "p") {
          return (
            <div
              key={i}
              className="platform"
              style={{
                left: `${item.posStartX}%`,
                width: `${item.posEndX - item.posStartX}%`,
                bottom: `${item.height}%`,
                height: "2%",
              }}
            />
          );
        } else {
          return (
            <div
              key={i}
              className="spike"
              style={{
                left: `${item.posStartX}%`,
                width: `${item.posEndX - item.posStartX}%`,
                bottom: `${item.height}%`,
                height: "2%",
              }}
            />
          );
        }
      })}
    </div>
  );
}


export default EmuSchermo;
