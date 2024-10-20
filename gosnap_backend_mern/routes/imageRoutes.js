const express = require('express');
const router = express.Router();
const multer = require('../middleware/multerConfig'); // Ensure this path is correct

const { uploadImage, applyGreyscale, applyBlackWhite } = require('../controllers/imageController'); // Check this import

// Route for uploading image
router.post('/upload', multer.single('image'), uploadImage);

// Route for applying greyscale filter
router.post('/greyscale', multer.single('image'), applyGreyscale); // Changed the route from '/api/greyscale' to '/greyscale'

// Route for applying black & white filter
router.post('/blackwhite', multer.single('image'), applyBlackWhite); // Changed the route from '/api/blackwhite' to '/blackwhite'

module.exports = router;
