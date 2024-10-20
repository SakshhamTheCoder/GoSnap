const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Upload image handler
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  const outputPath = path.join(__dirname, '../uploads', req.file.originalname);
  fs.writeFileSync(outputPath, req.file.buffer); // Save the file

  res.status(200).json({ message: 'Image uploaded successfully', filename: req.file.originalname });
};

// Apply greyscale filter handler
const applyGreyscale = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const greyscaleImage = await sharp(req.file.buffer).greyscale().toFormat('jpeg').toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(greyscaleImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying greyscale filter' });
  }
};

// Apply black & white filter handler
const applyBlackWhite = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const blackwhiteImage = await sharp(req.file.buffer).threshold(128).toFormat('jpeg').toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(blackwhiteImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying black & white filter' });
  }
};

// Exporting the functions
module.exports = { uploadImage, applyGreyscale, applyBlackWhite };
