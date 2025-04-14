import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ username, onSave, onBack }) => {
  const [newUsername, setNewUsername] = useState(username || "");
  const record =localStorage.getItem("record");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUsername.trim() !== "") {
      onSave(newUsername);
      onBack();
    }
  };



  return (
    <div className="home-emu-container">
      <h1 className="gameTitle">Profile</h1>
      <form className="profileForm" onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={newUsername} 
            onChange={(e) => setNewUsername(e.target.value)} 
            placeholder="Inserisci il tuo nome" 
          />
        </label>
        
        <p> RECORD: {record}</p>

        <button type="submit" className="homeButton">Save</button>
      </form>
      <button className="homeButton" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default Profile;
