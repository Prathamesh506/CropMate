import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Services from './pages/Services';
import ProtectedRoute from './components/ProtectedRoute';
import CropRecommendation from './pages/CropRecommendation';
import CropGuide from './pages/CropGuide';
import DiseaseDetection from './pages/DiseaseDetection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/recommend-crop" element={<CropRecommendation />} />
      <Route path="/cropguide" element={<CropGuide />} />
      {/* <Route path="/disease-detection" element={<DiseaseDetection />} /> */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
