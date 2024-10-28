// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import camera from '../assets/images/camera.png';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <div className="navbar-maindiv">
        <img src={camera} alt="menu" height={50} width={50} />
        <h1>Photography</h1>
        <div className="navbar-div2">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/create-event" className="navbar-link">Create Event</Link>
        <Link onClick={(e) => { e.preventDefault(); handleLogout(); }} className="navbar-link">Logout</Link>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
