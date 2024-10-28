// src/api/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signup = (formData) => API.post('/signup', formData);
export const login = (formData) => API.post('/login', formData);
export const createEvent = (formData) => API.post('/events', formData);
export const getEvents = () => API.get('/events');
export const getEventById = (id)=>API.get(`/events/${id}`)
