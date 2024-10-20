const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Import routes
const imageRoutes = require('./routes/imageRoutes');

// Middleware to serve static files (processed images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/image', imageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
