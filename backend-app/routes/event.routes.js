// backend/routes/event.routes.js
const express = require('express');
const { createEvent, getEvents ,getEventById} = require('../controllers/event.controller');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/events', authMiddleware, upload.fields([{ name: 'images' }, { name: 'videos' }]), createEvent);
router.get('/events', authMiddleware, getEvents);
router.get('/events/:id',getEventById)

module.exports = router;
