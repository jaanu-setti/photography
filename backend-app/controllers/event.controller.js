// backend/controllers/event.controller.js
const Event = require('../models/event.model');
const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

const createEvent = async (req, res) => {
  const { customerName, phoneNumber, eventName } = req.body;
  const createdBy = req.userId;
  try {
    const uploadedImages = [];
    const uploadedVideos = [];

    // Upload images
    if (req.files.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'events' });
        uploadedImages.push(result.secure_url);
      }
    }

    // Upload videos
    if (req.files.videos) {
      for (const file of req.files.videos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'events',
          resource_type: 'video'
        });
        uploadedVideos.push(result.secure_url);
      }
    }
   
    const event = await Event.create({
      eventId: uuidv4(), 
      customerName,
      phoneNumber,
      eventName,
      images: uploadedImages,
      videos: uploadedVideos,
      createdBy,
    });

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Could not create event' });
  }
};

const getEvents = async (req, res) => {
  try {
    let events = await Event.find({ createdBy: req.userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch events' });
  }
};

const getEventById = async (req,res) =>{
// Get event details by unique link
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event); 
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

module.exports = { createEvent, getEvents,getEventById };
