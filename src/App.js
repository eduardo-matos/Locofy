import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppProvider from './AppProvider';
import Index from './components/Index';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:token" component={Login} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
