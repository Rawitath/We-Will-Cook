// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import NoodleCustomization from './pages/NoodleCustomization';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NoodleSummary from './pages/NoodleSummary'; // Add this import
import CalibrationPage from './pages/CalibrationPage';
import HistoryPage from './pages/HistoryPage';
import ComingSoonPage from './pages/ComingSoonPage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customize" element={<NoodleCustomization />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/summary" element={<NoodleSummary />} /> {/* Add this route */}
          <Route path="/calibrate" element={<CalibrationPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}