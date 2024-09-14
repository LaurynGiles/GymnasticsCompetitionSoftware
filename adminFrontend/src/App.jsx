import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import { NotificationProvider } from './utils/connection.jsx';
import './App.css'

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" index element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginAdmin />} />

          <Route path="/homejudges" element={<HomeAdmin/>} />
          <Route path="/createWelcome" element={<WelcomePage/>} />
          <Route path="/competitionConfig" element={<ConfigPage/>} />
          {/* <Route path="/notificationsjudges" element={<NotificationsJudges />} /> */}
          {/* <Route path="/calculationsjudges" element={<CalculationsJudges/>} /> */}
          {/* <Route path="/scorecardjudges" element={<ScoreCardJudges />} /> */}

          {/* <Route path="/lobby" element={<LobbyHeadJudges />} /> */}
          {/* <Route path="/gymnastselect" element={<GymnastSelectHeadJudges />} /> */}
          {/* <Route path="/startingscore" element={<StartingScoreHeadJudges />} /> */}
          {/* <Route path="/submission" element={<SubmissionHeadJudges />} /> */}

          {/* <Route path="/settings" element={<SettingsJudges />} /> */}
        
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;