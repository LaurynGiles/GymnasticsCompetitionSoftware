import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import TimeSlotPage from './pages/TimeSlotPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import GymnastInfoPage from './pages/GymnastInfoPage.jsx';
import JudgeInfoPage from './pages/JudgeInfoPage.jsx';
import { NotificationProvider } from './utils/connection.jsx';
import './App.css'
import FinalResultsPage from './pages/FinalResultsPage.jsx';
import CompletePage from './pages/CompletePage.jsx';
import GymnastDataPage from './pages/GymnastDataPage.jsx';
import JudgeDataPage from './pages/JudgeDataPage.jsx';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" index element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginAdmin />} />

          <Route path="/homeAdmin" element={<HomeAdmin/>} />
          <Route path="/createWelcome" element={<WelcomePage/>} />
          <Route path="/competitionConfig" element={<ConfigPage/>} />
          <Route path="/timeslotConfig" element={<TimeSlotPage/>} />
          <Route path="/gymnastInfo" element={<GymnastInfoPage/>} />
          <Route path="/judgeInfo" element={<JudgeInfoPage/>} />
          <Route path="/completeSetup" element={<CompletePage/>} />
          <Route path="/results" element={<ResultsPage/>} />
          <Route path="/finalResults" element={<FinalResultsPage/>} />

          <Route path="/gymnastData" element={<GymnastDataPage/>} />
          <Route path="/judgeData" element={<JudgeDataPage/>} />

        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;