import { Router } from 'express';
const router = Router();
import upload from '../middleware/multerConfig.js';

import {
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
    convertImageFormat

} from '../controllers/imageController.js';

router.post('/greyscale', upload.single('image'), applyGreyscale);
router.post('/blackwhite', upload.single('image'), applyBlackWhite);
router.post('/gaussianblur', upload.single('image'), applyGaussianBlur);
router.post('/sepia', upload.single('image'), applySepia);
router.post('/invert', upload.single('image'), applyInvert);
router.post('/sharpen', upload.single('image'), applySharpen);
router.post('/brightness', upload.single('image'), applyBrightness);
router.post('/saturation', upload.single('image'), applySaturation);
router.post('/flip', upload.single('image'), applyFlip);
router.post('/flop', upload.single('image'), applyFlop);
router.post('/crop', upload.single('image'), cropImage);
router.post('/resize', upload.single('image'), resizeImage);
router.post('/watermark', upload.single('image'), applyWatermark);
router.post('/compress', upload.single('image'), compressImage);
router.post('/convert', upload.single('image'), convertImageFormat);

router.get('/list', (req, res) => {
    res.send({
        filters: [
            {
                name: 'greyscale',
                label: 'Greyscale',
            },
            {
                name: 'blackwhite',
                label: 'Black & White',
            },
            {
                name: 'gaussianblur',
                label: 'Gaussian Blur',
            },
            {
                name: 'sepia',
                label: 'Sepia',
            },
            {
                name: 'invert',
                label: 'Invert',
            },
            {
                name: 'sharpen',
                label: 'Sharpen',
            },
            {
                name: 'brightness',
                label: 'Brightness',
            },
            {
                name: 'saturation',
                label: 'Saturation',
            },
            {
                name: 'flip',
                label: 'Flip Vertically',
            },
            {
                name: 'flop',
                label: 'Flop Horizontally',
            },
            {
                name: 'crop',
                label: 'Crop Image'
            },
            {
                name: 'resize',
                label: 'Resize Image'
            },
            {
                name: 'watermark',
                label: 'Watermark Image'
            },
            {
                name: 'compress',
                label: 'Compress Image'
            },
            {
                name: 'convert',
                label: 'Convert Image'
            }
        ],
    });
});

export default router;
