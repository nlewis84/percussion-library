import React from 'react';
import { Router } from '@reach/router';
import './App.css';

import All from './pages/All/index';
import Show from './pages/Show/index';

function App() {
  return (
    <div className="wrapper">
      <h1>Percussion Library</h1>
      <Router>
        <All path="/" />
        <Show path="ensembles/:ensembleId" />
      </Router>
    </div>
  );
}

export default App;
