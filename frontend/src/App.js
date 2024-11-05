import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoodleCustomization from './pages/NoodleCustomization';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customize" element={<NoodleCustomization />} />
      </Routes>
    </Router>
  );
}