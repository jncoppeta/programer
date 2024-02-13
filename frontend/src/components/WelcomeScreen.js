import React, { useState } from 'react';
import { FaLock, FaLockOpen } from "react-icons/fa";

const WelcomeScreen = ({ handleGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="welcome-div">
      <h1>welcome to programer</h1>
      <p style={{ fontSize: '15px' }}>click the lock to get started</p>
      <div className="welcome-lock-div" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {isHovered ? <FaLockOpen onClick={handleGetStarted} id="welcome-lock"/> : <FaLock />}
      </div>
    </div>
  );
};

export default WelcomeScreen;
