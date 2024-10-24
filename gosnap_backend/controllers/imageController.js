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

// Crop image handler
const cropImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  const { width, height, left, top } = req.body;

  try {
    const croppedImage = await sharp(req.file.buffer)
      .extract({ width: parseInt(width), height: parseInt(height), left: parseInt(left), top: parseInt(top) })
      .toFormat('png')
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(croppedImage);
  } catch (error) {
    res.status(500).json({ error: 'Error cropping image' });
  }
};

// Resize image handler
const resizeImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  const { width, height } = req.body;
  
  try {
    const resizedImage = await sharp(req.file.buffer)
      .resize(parseInt(width), parseInt(height))
      .toFormat('png')
      .toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(resizedImage);
  } catch (error) {
    res.status(500).json({ error: 'Error resizing image' });
  }
};


// Watermark image handler
const applyWatermark = async (req, res) => {
  if (!req.file || !req.body.watermarkText) {
    return res.status(400).json({ error: 'Please upload an image and provide watermark text' });
  }

  const { watermarkText } = req.body;

  try {
    const image = sharp(req.file.buffer);
    const { width, height } = await image.metadata();

    // Generate the watermark SVG with better coverage
    const watermark = Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .watermark {
            fill: rgba(255, 255, 255, 0.3);  /* Adjust opacity */
            font-size: 40;  /* Font size for better visibility */
            font-family: Arial, sans-serif;
            transform: rotate(-45deg);
          }
        </style>
        ${Array.from({ length: Math.ceil(height / 100) }).map((_, y) =>
          Array.from({ length: Math.ceil(width / 100) }).map((_, x) =>
            `<text x="${x * 250 - 350}" y="${y * 180 + 50}" class="watermark">${watermarkText}</text>`
          ).join('')
        ).join('')}
      </svg>`
    );

    const watermarkedImage = await image
      .composite([{ input: watermark }])  // Composite the watermark across the image
      .toFormat('png')
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(watermarkedImage);
  } catch (error) {
    console.error('Error applying watermark:', error);
    res.status(500).json({ error: 'Error applying watermark' });
  }
};

// Compress image handler
const compressImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  try {
    const compressedImage = await sharp(req.file.buffer)
      .jpeg({ quality: 50 })
      .toBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(compressedImage);
  } catch (error) {
    res.status(500).json({ error: 'Error compressing image' });
  }
};

// Convert image format handler
const convertImageFormat = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }

  const format = req.body.format.toLowerCase(); // Ensure the format is lowercase

  try {
    const convertedImage = await sharp(req.file.buffer)
      .toFormat(format)  // Sharp needs the format in lowercase (jpeg, png, webp, jpg etc.)
      .toBuffer();

    res.set('Content-Type', `image/${format}`);
    res.send(convertedImage);
  } catch (error) {
    console.error(`Error converting image to ${format}:`, error);
    res.status(500).json({ error: `Error converting image to ${format}` });
  }
};


// Exporting the functions
export {
  applyGreyscale,
  applyBlackWhite,
  applyGaussianBlur,
  applySepia,
  applyInvert,
  applySharpen,
  applyBrightness,
  applySaturation,
  applyFlip,
  applyFlop,
  cropImage,
  resizeImage,
  applyWatermark,
  compressImage,
  convertImageFormat,
};