import express, { json } from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS!
app.use(json());

// Use routes
app.use('/api/image', imageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
