import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginJudges from './pages/LoginJudges';
import HomeJudges from './pages/HomeJudges';
import './App.css'
// import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginJudges />} /> */}
        <Route path="/home" element={<HomeJudges />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/note" element={<Note />} /> */}
        <Route path="/" index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
