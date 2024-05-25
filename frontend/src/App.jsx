import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginJudges from './pages/LoginJudges';
import HomeJudges from './pages/HomeJudges';
import NotificationsJudges from './pages/NotificationsJudges';
import CalculationsJudges from './pages/CalculationsJudges';
import ScoreCardJudges from './pages/ScoreCardJudges';
import LobbyHeadJudges from './pages/LobbyHeadJudges';
import GymnastSelectHeadJudges from './pages/GymnastSelectHeadJudges';
import StartingScoreHeadJudges from './pages/StartingScoreHeadJudges';
import SubmissionHeadJudges from './pages/SubmissionHeadJudges';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginJudges />} />

        <Route path="/homejudges" element={<HomeJudges />} />
        <Route path="/notificationsjudges" element={<NotificationsJudges />} />
        <Route path="/calculationsjudges" element={<CalculationsJudges/>} />
        <Route path="/scorecardjudges" element={<ScoreCardJudges />} />

        <Route path="/lobby" element={<LobbyHeadJudges />} />
        <Route path="/gymnastselect" element={<GymnastSelectHeadJudges />} />
        <Route path="/startingscore" element={<StartingScoreHeadJudges />} />
        <Route path="/submission" element={<SubmissionHeadJudges />} />
      
      </Routes>
    </Router>
  );
}

export default App;
