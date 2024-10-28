// src/pages/Login.js
import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await login(formData);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('Login successful, navigating to dashboard');
            // setIsAuthenticated(true); // Update authentication state
            navigate('/dashboard');
        } else {
            console.error('Login response did not contain a token');
        }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <p>Didn't logged in yet ?</p>
      <button onClick={()=>navigate('/signup')}>SignUp</button>
    </form>
  );
};

export default Login;
