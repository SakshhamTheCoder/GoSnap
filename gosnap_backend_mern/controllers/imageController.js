import sharp from 'sharp';

// Apply greyscale filter handler
const applyGreyscale = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const greyscaleImage = await sharp(req.file.buffer).greyscale().toFormat('png').toBuffer();
    res.set('Content-Type', 'image/png');
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
    const blackwhiteImage = await sharp(req.file.buffer).threshold(128).toFormat('png').toBuffer();
    res.set('Content-Type', 'image/png');
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
    const gaussianBlurImage = await sharp(req.file.buffer).blur(10).toFormat('png').toBuffer();
    res.set('Content-Type', 'image/png');
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
      .toBuffer();
    res.set('Content-Type', 'image/png');
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
      .toBuffer();
    res.set('Content-Type', 'image/png');
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
    }).toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(sharpenImage);
  } catch (error) {
    res.status(500).json({ error: 'Error applying sharpen filter' });
  }
};

const applyBrightness = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const brightnessImage = await sharp(req.file.buffer)
      .modulate({
        brightness: parseFloat(req.body.value)
      })
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(brightnessImage);
    console.log(req.body.value);
  } catch (error) {
    res.status(500).json({ error: 'Error applying brightness filter' });
  }
};

const applySaturation = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const saturationImage = await sharp(req.file.buffer)
      .modulate({
        saturation: parseFloat(req.body.value)
      })
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(saturationImage);
    console.log(req.body.value);
  } catch (error) {
    res.status(500).json({ error: 'Error applying saturation filter' });
  }
};

const applyFlip = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const flipImage = await sharp(req.file.buffer)
      .flip()
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(flipImage);
  } catch (error) {
    res.status(500).json({ error: 'Error flipping image' });
  }
};

const applyFlop = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const flopImage = await sharp(req.file.buffer)
      .flop()
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(flopImage);
  } catch (error) {
    res.status(500).json({ error: 'Error flopping image' });
  }
};

// Exporting the functions
export { applyGreyscale, applyBlackWhite, applyGaussianBlur, applySepia, applyInvert, applySharpen, applyBrightness, applySaturation, applyFlip, applyFlop };
