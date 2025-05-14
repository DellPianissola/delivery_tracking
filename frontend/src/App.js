import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import List from './pages/List';
import Map from './pages/Map';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> | 
        <Link to="/deliveries">List</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/deliveries" element={<List />} />
        <Route path="/map/:id" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
