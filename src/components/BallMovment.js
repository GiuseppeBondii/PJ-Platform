import React, { useState, useEffect, useRef } from "react";
import "./BallMovement.css"; // Qui puoi definire eventuali stili aggiuntivi

// Costanti per la fisica della pallina
const ballSize = 5; // percentuale della larghezza del contenitore
const horizontalAcceleration = 0.2;
const maxHorizontalSpeed = 2;
const friction = 0.1;
const jumpVelocity = 7;
const gravity = -0.5;

function BallMovement() {
  const [ball, setBall] = useState({
    x: 50, // posizionato al centro orizzontalmente (in percentuale)
    y: 0,  // inizia sul pavimento
    vx: 0,
    vy: 0,
    isOnGround: true,
  });

  // Usa un ref per tenere traccia delle chiavi attualmente premute
  const keysPressedRef = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressedRef.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysPressedRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const animationFrameRef = useRef(null);

  useEffect(() => {
    const update = () => {
      setBall(prev => {
        let { x, y, vx, vy, isOnGround } = prev;
        const keys = keysPressedRef.current;

        // Movimento orizzontale
        if (keys["ArrowLeft"]) {
          vx -= horizontalAcceleration;
        }
        if (keys["ArrowRight"]) {
          vx += horizontalAcceleration;
        }
        // Applica attrito se non si sta muovendo
        if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
          if (vx > 0) {
            vx = Math.max(vx - friction, 0);
          } else if (vx < 0) {
            vx = Math.min(vx + friction, 0);
          }
        }
        // Limita la velocità orizzontale
        vx = Math.max(Math.min(vx, maxHorizontalSpeed), -maxHorizontalSpeed);

        // Salto: se la barra spaziatrice viene premuta e la pallina è sul pavimento
        if (keys["Space"] && isOnGround) {
          vy = jumpVelocity;
          isOnGround = false;
        }

        // Applica gravità
        vy += gravity;

        // Aggiorna le posizioni
        x += vx;
        y += vy;

        // Gestione collisione con il "pavimento" (y = 0)
        if (y < 0) {
          y = 0;
          vy = 0;
          isOnGround = true;
        }

        // Limita il movimento orizzontale nel contenitore (0% - 100%)
        if (x < 0) {
          x = 0;
          vx = 0;
        }
        if (x > 100 - ballSize) {
          x = 100 - ballSize;
          vx = 0;
        }

        return { x, y, vx, vy, isOnGround };
      });
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return (
    <div
      className="ball-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#eee",
      }}
    >
      <div
        className="ball"
        style={{
          position: "absolute",
          left: `${ball.x}%`,
          bottom: `${ball.y}%`,
          width: `${ballSize}%`,
          height: `${ballSize}%`,
          background: "red",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default BallMovement;
