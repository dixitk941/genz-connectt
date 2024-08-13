import React, { useState } from 'react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burger-menu">
      <button onClick={() => setIsOpen(!isOpen)} className="burger-button">
        ☰
      </button>
      {isOpen && (
        <div className="menu">
          <a href="#chat">Chat</a>
          <a href="#notes" onClick={() => document.getElementById('notes-iframe').src = 'https://genznotes.vercel.app'}>Notes</a>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;