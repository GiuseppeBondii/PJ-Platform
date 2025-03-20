import React, { useState, useCallback, useEffect } from "react";
import EmuSchermo from "./EmuSchermo";
import "./HomeP.css";

const BUTTONS = {
  A: 1,
  B: 2,
  START: 3,
  SELECT: 4,
  UP: 5,
  DOWN: 6,
  LEFT: 7,
  RIGHT: 8,
};

function HomeP() {
  // Stato per tracciare tutti i pulsanti attualmente premuti
  const [pressedButtons, setPressedButtons] = useState({});

  // Gestione pressione pulsante
  const handleButtonDown = useCallback((button) => {
    setPressedButtons(prev => ({
      ...prev,
      [button]: true
    }));
    
    switch (button) {
      case BUTTONS.A:
        console.log("A pressed");
        break;
      case BUTTONS.B:
        console.log("B pressed");
        break;
      case BUTTONS.START:
        console.log("Start pressed");
        break;
      case BUTTONS.SELECT:
        console.log("Select pressed");
        break;
      case BUTTONS.UP:
        console.log("Up pressed");
        break;
      case BUTTONS.DOWN:
        console.log("Down pressed");
        break;
      case BUTTONS.LEFT:
        console.log("Left pressed");
        break;
      case BUTTONS.RIGHT:
        console.log("Right pressed");
        break;
      default:
        console.warn("Input non riconosciuto");
        break;
    }
  }, []);

  // Gestione rilascio pulsante
  const handleButtonUp = useCallback((button) => {
    setPressedButtons(prev => {
      const newState = { ...prev };
      delete newState[button];
      return newState;
    });
    
    console.log(`Button ${button} released`);
  }, []);

  // Gestione input da tastiera
  useEffect(() => {
    const handleKeyDown = (e) => {
      let button = null;
      
      switch (e.key.toLowerCase()) {
        case "a":
          button = BUTTONS.A;
          break;
        case "b":
          button = BUTTONS.B;
          break;
        case "enter":
          button = BUTTONS.START;
          break;
        case "backspace":
          button = BUTTONS.SELECT;
          break;
        case "arrowup":
          button = BUTTONS.UP;
          break;
        case "arrowdown":
          button = BUTTONS.DOWN;
          break;
        case "arrowleft":
          button = BUTTONS.LEFT;
          break;
        case "arrowright":
          button = BUTTONS.RIGHT;
          break;
        default:
          return;
      }
      
      // Previene ripetizioni della pressione del tasto tenuto premuto
      if (!pressedButtons[button]) {
        handleButtonDown(button);
      }
    };

    const handleKeyUp = (e) => {
      let button = null;
      
      switch (e.key.toLowerCase()) {
        case "a":
          button = BUTTONS.A;
          break;
        case "b":
          button = BUTTONS.B;
          break;
        case "enter":
          button = BUTTONS.START;
          break;
        case "backspace":
          button = BUTTONS.SELECT;
          break;
        case "arrowup":
          button = BUTTONS.UP;
          break;
        case "arrowdown":
          button = BUTTONS.DOWN;
          break;
        case "arrowleft":
          button = BUTTONS.LEFT;
          break;
        case "arrowright":
          button = BUTTONS.RIGHT;
          break;
        default:
          return;
      }
      
      handleButtonUp(button);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleButtonDown, handleButtonUp, pressedButtons]);

  // Funzioni per gestire gli eventi touch/mouse per i pulsanti
  const handleButtonTouchStart = (button) => (e) => {
    //e.preventDefault();
    handleButtonDown(button);
  };

  const handleButtonTouchEnd = (button) => (e) => {
    e.preventDefault();
    handleButtonUp(button);
  };

  return (
    <div className="emuContainer">
      {/* Portrait Layout */}
      <div className="portraitLayout">
        <div className="screenContainer">
          <div className="windowEmu">
            {/* Passa l'oggetto pressedButtons a EmuSchermo */}
            <EmuSchermo pressedButtons={pressedButtons} />
          </div>
        </div>

        <div className="controlsRow">
          <div className="dpadContainer">
            <div className="dpad">
              {/*<button
                className="arrow up"
                onMouseDown={handleButtonTouchStart(BUTTONS.UP)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.UP)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.UP)}
                onTouchStart={handleButtonTouchStart(BUTTONS.UP)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.UP)}
                aria-label="Up"
              ></button>*/}
              <button
                className="arrow left"
                onMouseDown={handleButtonTouchStart(BUTTONS.LEFT)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.LEFT)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.LEFT)}
                onTouchStart={handleButtonTouchStart(BUTTONS.LEFT)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.LEFT)}
                aria-label="Left"
              ></button>
              <button
                className="arrow right"
                onMouseDown={handleButtonTouchStart(BUTTONS.RIGHT)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.RIGHT)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.RIGHT)}
                onTouchStart={handleButtonTouchStart(BUTTONS.RIGHT)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.RIGHT)}
                aria-label="Right"
              ></button>
{ /*             <button
                className="arrow down"
                onMouseDown={handleButtonTouchStart(BUTTONS.DOWN)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.DOWN)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.DOWN)}
                onTouchStart={handleButtonTouchStart(BUTTONS.DOWN)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.DOWN)}
                aria-label="Down"
              ></button>*/}
            </div>
          </div>

          <div className="actionButtonsContainer">
            <div className="actionButtons">
              <button
                className="red-button"
                onMouseDown={handleButtonTouchStart(BUTTONS.A)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.A)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.A)}
                onTouchStart={handleButtonTouchStart(BUTTONS.A)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.A)}
                aria-label="A Button"
              >
                J
              </button>

              {/*
              <button
                className="blue-button"
                onMouseDown={handleButtonTouchStart(BUTTONS.B)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.B)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.B)}
                onTouchStart={handleButtonTouchStart(BUTTONS.B)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.B)}
                aria-label="B Button"
              >
                B
              </button>
              */}

            </div>
          </div>
        </div>

        <div className="startSelectContainer">
          <button
            className="select-button"
            onMouseDown={handleButtonTouchStart(BUTTONS.SELECT)}
            onMouseUp={handleButtonTouchEnd(BUTTONS.SELECT)}
            onMouseLeave={handleButtonTouchEnd(BUTTONS.SELECT)}
            onTouchStart={handleButtonTouchStart(BUTTONS.SELECT)}
            onTouchEnd={handleButtonTouchEnd(BUTTONS.SELECT)}
          >
            SELECT
          </button>
          <button
            className="start-button"
            onMouseDown={handleButtonTouchStart(BUTTONS.START)}
            onMouseUp={handleButtonTouchEnd(BUTTONS.START)}
            onMouseLeave={handleButtonTouchEnd(BUTTONS.START)}
            onTouchStart={handleButtonTouchStart(BUTTONS.START)}
            onTouchEnd={handleButtonTouchEnd(BUTTONS.START)}
          >
            START
          </button>
        </div>
      </div>

      {/* Landscape Layout */}
      <div className="landscapeLayout">
        <div className="controlsRowLandscape">
          <div className="dpadContainer">
            <div className="dpad">
             {/*

<button
                className="arrow up"
                onMouseDown={handleButtonTouchStart(BUTTONS.UP)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.UP)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.UP)}
                onTouchStart={handleButtonTouchStart(BUTTONS.UP)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.UP)}
                aria-label="Up"
              ></button>
             */} 
              <button
                className="arrow left"
                onMouseDown={handleButtonTouchStart(BUTTONS.LEFT)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.LEFT)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.LEFT)}
                onTouchStart={handleButtonTouchStart(BUTTONS.LEFT)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.LEFT)}
                aria-label="Left"
              ></button>
              <button
                className="arrow right"
                onMouseDown={handleButtonTouchStart(BUTTONS.RIGHT)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.RIGHT)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.RIGHT)}
                onTouchStart={handleButtonTouchStart(BUTTONS.RIGHT)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.RIGHT)}
                aria-label="Right"
              ></button>

              {/*
              <button
                className="arrow down"
                onMouseDown={handleButtonTouchStart(BUTTONS.DOWN)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.DOWN)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.DOWN)}
                onTouchStart={handleButtonTouchStart(BUTTONS.DOWN)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.DOWN)}
                aria-label="Down"
              ></button>
             */}

            </div>
          </div>

          <div className="screenContainer">
            <div className="windowEmu">
              <EmuSchermo pressedButtons={pressedButtons} />
            </div>
          </div>

          <div className="actionButtonsContainer">
            <div className="actionButtons">
              <button
                className="red-button"
                onMouseDown={handleButtonTouchStart(BUTTONS.A)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.A)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.A)}
                onTouchStart={handleButtonTouchStart(BUTTONS.A)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.A)}
                aria-label="A Button"
              >
                J
              </button>
              {/*<button
                className="blue-button"
                onMouseDown={handleButtonTouchStart(BUTTONS.B)}
                onMouseUp={handleButtonTouchEnd(BUTTONS.B)}
                onMouseLeave={handleButtonTouchEnd(BUTTONS.B)}
                onTouchStart={handleButtonTouchStart(BUTTONS.B)}
                onTouchEnd={handleButtonTouchEnd(BUTTONS.B)}
                aria-label="B Button"
              >
                B
              </button>*/}
            </div>
          </div>
        </div>

        <div className="startSelectContainer">
          <button
            className="select-button"
            onMouseDown={handleButtonTouchStart(BUTTONS.SELECT)}
            onMouseUp={handleButtonTouchEnd(BUTTONS.SELECT)}
            onMouseLeave={handleButtonTouchEnd(BUTTONS.SELECT)}
            onTouchStart={handleButtonTouchStart(BUTTONS.SELECT)}
            onTouchEnd={handleButtonTouchEnd(BUTTONS.SELECT)}
          >
            SELECT
          </button>
          <button
            className="start-button"
            onMouseDown={handleButtonTouchStart(BUTTONS.START)}
            onMouseUp={handleButtonTouchEnd(BUTTONS.START)}
            onMouseLeave={handleButtonTouchEnd(BUTTONS.START)}
            onTouchStart={handleButtonTouchStart(BUTTONS.START)}
            onTouchEnd={handleButtonTouchEnd(BUTTONS.START)}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeP;