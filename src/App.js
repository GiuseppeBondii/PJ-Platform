import React, { useState, useEffect } from "react";
import "./App.css";
import GameP from "./components/GameP";
import HomeScreen from "./components/HomeScreen";
import Rules from "./components/Rules";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import UsernameModal from "./components/UsernameModal";

function App() {
  // Stato per gestire quale schermo visualizzare: "home", "game", "rules", "leaderboard" o "profile"
  const [screen, setScreen] = useState("home");
  // Stato per il nome utente: recupera da localStorage se già presente
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  // Stato per mostrare il modal al primo accesso (quando username è vuoto)
  const [showModal, setShowModal] = useState(false);

  // Al montaggio, se non è presente un nome utente, mostra il modal
  useEffect(() => {
    if (!username) {
      setShowModal(true);
    }
  }, [username]);

  const handlePlay = () => {
    setScreen("game");
  };

  const handleRules = () => {
    setScreen("rules");
  };

  const handleLeaderboard = () => {
    setScreen("leaderboard");
  };

  const handleProfile = () => {
    setScreen("profile");
  };

  const handleBackToHome = () => {
    setScreen("home");
  };

  // Funzione per salvare il nome utente e persisterlo in localStorage
  const handleSaveUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  // Switch per la navigazione in base allo stato "screen"
  switch (screen) {
    case "game":
      return <GameP />;
    case "rules":
      return <Rules onBack={handleBackToHome} />;
    case "leaderboard":
      return <Leaderboard onBack={handleBackToHome} />;
    case "profile":
      return <Profile username={username} onSave={handleSaveUsername} onBack={handleBackToHome} />;
    default:
      return (
        <>
          {/* Modal per l'inserimento del nome utente se non presente */}
          {showModal && (
            <UsernameModal 
              onSave={(name) => {
                handleSaveUsername(name);
                setShowModal(false);
              }}
            />
          )}
          <HomeScreen 
            onPlay={handlePlay} 
            onRules={handleRules}
            onLeaderboard={handleLeaderboard}
            onProfile={handleProfile}
          />
        </>
      );
  }
}

export default App;
