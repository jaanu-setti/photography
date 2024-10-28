
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

const app = express();
app.use(express.json());

const cors = require('cors');

// Use CORS middleware
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', eventRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch((error) => console.error('Database connection error:', error));
