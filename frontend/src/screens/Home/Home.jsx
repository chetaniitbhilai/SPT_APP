// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="sidebar">
        <img className="logo" src="../../assets/CCPS.png" alt="Logo" />
        <nav className="nav">
          <a href="#central-database" className="nav-link">Central Database</a>
          <a href="#add-data" className="nav-link">Add Data</a>
        </nav>
        <button className="logout-button">Logout</button>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="main-content">
        Home
      </div>
    </div>
  );
};

export default Home;
