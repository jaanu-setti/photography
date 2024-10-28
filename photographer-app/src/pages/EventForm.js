// src/pages/EventForm.js
import React, { useState, useRef, useEffect } from 'react';
import { createEvent } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/EventForm.css'
import { FaTrash } from 'react-icons/fa'; // Import the FaTrash icon


const EventForm = () => {

    const fileInputImgRef = useRef(null);
    const fileInputVideoRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    eventName: '',
    images: [],
    videos: []
  });
  const navigate = useNavigate();

  const [email , setEmail] = useState('');
  useEffect(()=>{
    const storeduser = localStorage.getItem('user');
    if(storeduser){
        const userdata = JSON.parse(storeduser);
        setEmail(userdata.email)
    }
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const max_files = 5;
    const max_videos = 2;
    const handleFileChange = (e) =>{
        const {name , files} = e.target;
        const newfiles = Array.from(files);
        setFormData((prevData)=>{
            const currentTotalFiles = prevData.images.length + prevData.videos.length;
            const isvideo = name === 'videos';
            const currentvideos = prevData.videos.length;

            //calculating remaining slots for images and videos
            let availableslots = max_files - currentTotalFiles;
            let allowedfiles = newfiles;
            if(isvideo){
                if(currentvideos >= max_files){
                    alert(`maximum of ${max_videos} videos allowed`)
                    return prevData;
                }
                const remainingvideoslots = max_videos-currentvideos;
                availableslots = Math.min(availableslots,remainingvideoslots);
                allowedfiles = newfiles.slice(0,availableslots);
            }  else {
                 allowedfiles = newfiles.slice(0,availableslots)
                } 
            if(allowedfiles.length === 0) {
                alert('You exceeded the maximum files limit')
                return prevData;
            }
            return{
                ...prevData,
                [name] : [...prevData[name] , ...allowedfiles],
            };
            
        });
    };

    const handleDeleteFile = (name, index) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: prevData[name].filter((_, i) => i !== index), // Remove the selected file
        }));
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const form = new FormData();
    form.append('customerName', formData.customerName);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('eventName', formData.eventName);
    Array.from(formData.images).forEach(image => form.append('images', image));
    Array.from(formData.videos).forEach(video => form.append('videos', video));

    try {
      await createEvent(form);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating event', error);
    } finally {
        setLoading(false); // Set loading to false after the API call completes
    }
  };

    const handleUploadImgClick = () => {
        fileInputImgRef.current.click(); // Programmatically click the input
    };
    const handleUploadVideoClick=()=>{
        fileInputVideoRef.current.click();
    }

  return (
    <div>
      <Navbar />
          {loading && <div className="loader">Loading...</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Create Event</h2>
        <input type='email' value={email} readOnly/>
        <input type="text" name="customerName" placeholder="Customer Name" onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="eventName" placeholder="Event Name" onChange={handleChange} required />
              <div className="file-upload-container">
                  <div className="upload-section">
                      <div className="upload-area" onClick={handleUploadImgClick}>
                          <input type="file" name="images" ref={fileInputImgRef} style={{ display: 'none' }} multiple onChange={handleFileChange} accept="image/*" />
                          <p>Drag & drop images here or click to select images</p>
                      </div>
                      <div className="uploaded-files">
                          <h3>Uploaded Images:</h3>
                          {formData.images.length > 0 ? (
                              <ul>
                                  {formData.images.map((file, index) => (
                                      <li key={index}>
                                          {file.name}
                                          <FaTrash onClick={() => handleDeleteFile('images', index)} className="delete-icon" />
                                      </li>
                                  ))}
                              </ul>
                          ) : (
                              <p>No images uploaded.</p>
                          )}
                      </div>
                  </div>

                  <div className="upload-section">
                      <div className="upload-area" onClick={handleUploadVideoClick}>
                          <input type="file" name="videos" ref={fileInputVideoRef} multiple onChange={handleFileChange} style={{ display: 'none' }} accept="video/*" />
                          <p>Drag & drop videos here or click to select videos</p>
                      </div>
                      <div className="uploaded-files">
                          <h3>Uploaded Videos:</h3>
                          {formData.videos.length > 0 ? (
                              <ul>
                                  {formData.videos.map((file, index) => (
                                      <li key={index}>
                                          {file.name}
                                          <FaTrash onClick={() => handleDeleteFile('videos', index)} className="delete-icon" />
                                      </li>
                                  ))}
                              </ul>
                          ) : (
                              <p>No videos uploaded.</p>
                          )}
                      </div>
                  </div>
              </div>
              <button type="submit" disabled={loading}>Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
