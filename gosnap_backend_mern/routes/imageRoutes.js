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

} from '../controllers/imageController.js';

router.post('/greyscale', upload.single('image'), applyGreyscale);
router.post('/blackwhite', upload.single('image'), applyBlackWhite);
router.post('/gaussianblur', upload.single('image'), applyGaussianBlur);
router.post('/sepia', upload.single('image'), applySepia);
router.post('/invert', upload.single('image'), applyInvert);
router.post('/sharpen', upload.single('image'), applySharpen);

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
        ],
    });
});

export default router;
