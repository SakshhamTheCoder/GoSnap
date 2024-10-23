import sharp from 'sharp';

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

// Apply Gaussian blur filter handler
const applyGaussianBlur = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const gaussianBlurImage = await sharp(req.file.buffer).blur(10).toFormat('jpeg').toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(gaussianBlurImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying gaussian blur filter' });
  }
};

// Apply sepia filter handler (using manual color adjustments)
const applySepia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const sepiaImage = await sharp(req.file.buffer)
      .modulate({
        brightness: 1.1,
        saturation: 0.3,
        hue: 30
      })
      .toFormat('jpeg')
      .toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(sepiaImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying sepia filter' });
  }
};

// Apply invert (negate) filter handler
const applyInvert = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const invertImage = await sharp(req.file.buffer)
      .ensureAlpha()  // Ensure alpha channel is handled
      .negate({ alpha: false })  // Invert without affecting transparency (alpha)
      .toFormat('jpeg')
      .toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(invertImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying invert filter' });
  }
};

// Apply sharpen filter handler
const applySharpen = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const sharpenImage = await sharp(req.file.buffer).sharpen({
      sigma: 1,
      flat: 1,
      jagged: 2
    }).toFormat('jpeg').toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(sharpenImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying sharpen filter' });
  }
};

// Exporting the functions
export { applyGreyscale, applyBlackWhite, applyGaussianBlur, applySepia, applyInvert, applySharpen };
