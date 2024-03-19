const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// DB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Successfully connected to the database');
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Use user routes for URLs starting with '/api/users'

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
