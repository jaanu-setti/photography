// backend/models/event.model.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
   eventId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  eventName: { type: String, required: true },
  images: [String],
  videos: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
