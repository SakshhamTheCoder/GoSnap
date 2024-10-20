const sharp = require('sharp');

// Apply greyscale filter
const applyGreyscale = async (buffer) => {
  return await sharp(buffer).greyscale().toFormat('jpeg').toBuffer();
};

// Apply black & white filter
const applyBlackWhite = async (buffer) => {
  return await sharp(buffer).threshold(128).toFormat('jpeg').toBuffer();
};

module.exports = { applyGreyscale, applyBlackWhite };
