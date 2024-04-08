import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Router1 from './pages/router1';
import Router2 from './pages/router2';
import bounce from './pages/bounce';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/router1" Component={Router1} />
          <Route path="/router2" Component={Router2} />
          <Route path="/bounce" Component={bounce} />
        </Routes>
      </Router>
      <div className="App">根组件</div>
    </div>
  );
}

export default App;
