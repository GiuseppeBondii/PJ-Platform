import React, { useState } from "react";
import "./UsernameModal.css";

const UsernameModal = ({ onSave }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onSave(username);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome!</h2>
        <p>Insert your username:</p>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="here your username" 
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
