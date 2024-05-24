import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginJudges from './pages/LoginJudges';
import HomeJudges from './pages/HomeJudges';
import NotificationsJudges from './pages/NotificationsJudges'
import CalculationsJudges from './pages/CalculationsJudges'
import ScoreCardJudges from './pages/ScoreCardJudges';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginJudges />} />

        <Route path="/homejudges" element={<HomeJudges />} />
        <Route path="/notificationsjudges" element={<NotificationsJudges />} />
        <Route path="/calculationsjudges/:level/:age/:apparatus" element={<CalculationsJudges/>} />
        <Route path="/scorecardjudges/:level/:age/:apparatus/:deductions" element={<ScoreCardJudges />} />
      
      </Routes>
    </Router>
  );
}

export default App;
