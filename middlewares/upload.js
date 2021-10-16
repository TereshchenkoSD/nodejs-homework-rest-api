const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const IMG_MAX_SIZE = 2048;

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: IMG_MAX_SIZE,
  },
});

const upload = multer({
  storage: uploadConfig,
});

module.exports = upload;
