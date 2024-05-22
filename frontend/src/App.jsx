import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginJudges from './pages/LoginJudges';
import HomeJudges from './pages/HomeJudges';
import NotificationsJudges from './pages/NotificationsJudges'
import CalculationsJudges from './pages/CalculationsJudges'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginJudges />} />
        <Route path="/home" element={<HomeJudges />} />
        <Route path="/notifications" element={<NotificationsJudges />} />
        <Route path="/calculations" element={<CalculationsJudges />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/note" element={<Note />} /> */}
        <Route path="/" index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
