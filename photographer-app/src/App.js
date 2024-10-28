// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EventForm from './pages/EventForm';
import Signup from './pages/SignUp';
import EventDetails from './pages/EventDetails'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  console.log("isAuthenticated", isAuthenticated)
  useEffect(() => {
    // Listen for changes in local storage
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" setIsAuthenticated={setIsAuthenticated} element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={isAuthenticated ? <EventForm /> : <Navigate to="/login" />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
