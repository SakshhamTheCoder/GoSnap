const multer = require('multer');

// Store the image in memory temporarily
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
