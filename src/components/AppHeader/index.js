import React from 'react';
import logo from '../../logo.png';
import './AppHeader.css';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="container">
        <img src={logo} className="app-logo" alt="Locofy" />
      </div>
    </header>
  );
}

export default AppHeader;
