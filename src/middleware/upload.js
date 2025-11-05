// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

// ensure upload dir exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .slice(0, 20);
    const unique = Date.now() + '-' + Math.round(Math.random()*1e6);
    cb(null, `${base}-${unique}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only images are allowed (jpeg, png, webp)'), false);
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB max per file

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
