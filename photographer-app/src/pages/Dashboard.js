// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/api';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [events, setEvents] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };
    fetchEvents();
  }, []);

   const handleRowClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    
    <div className="dashboard-container">
      <Navbar/>
      {/* <div> */}
        <h1>Your Events</h1>
         <button className="create-button" onClick={() => window.location.href = '/create-event'}>
          Create Event
        </button>
      {/* </div> */}
     <div>

       {events.length > 0 ? 
         <table className="event-table">
         <thead>
           <tr>
             <th>Event Name</th>
             <th>Customer Name</th>
             <th>Phone Number</th>
             <th>Date Created</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {events.map((event) => (
             <tr key={event.id} onClick={() => handleRowClick(event._id)}>
               <td>{event.eventName}</td>
               <td>{event.customerName}</td>
               <td>{event.phoneNumber}</td>
               <td>{new Date(event.createdAt).toLocaleString()}</td>
               <td> <Link to={`/events/${event._id}`}>  <button>View Details</button></Link></td>
             </tr>
           ))}
         </tbody>
       </table>
        : "You have no Events Yet"}
     </div>
    </div>
  );
};

export default Dashboard;
