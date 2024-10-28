// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/api';
import '../styles/EventDetails.css'; 

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getEventById(id);
                setEvent(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load event details');
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="event-details-container">
             <div >
               <h2 className="title">Event Details</h2>
               </div>   
            
            {event && (
                <div className="event-card">
                    <h1>{event.customerName}'s  {event.eventName}</h1>
                    <p><strong>Event ID:</strong> {event.eventId}</p>
                    <div className="media-section">
                        <h3>Images:</h3>
                        {event.images && event.images.length > 0 ? (
                            <div className="image-gallery">
                                {event.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Event Image ${index + 1}`}
                                        className="event-image"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className="media-section">
                        <h3>Videos:</h3>
                        {event.videos && event.videos.length > 0 ? (
                            <div className="video-gallery">
                                {event.videos.map((video, index) => (
                                    <video
                                        key={index}
                                        src={video}
                                        controls
                                        className="event-video"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No videos available</p>
                        )}
                    </div>

                </div>
              
            )}
        </div>
    );
};

export default EventDetails;
