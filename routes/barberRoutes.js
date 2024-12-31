const express = require('express');
const multer = require('multer');
const { createBarber, loginBarber, getAllBarbers } = require('../controllers/barberController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('logotipo'), createBarber);
router.post('/login', loginBarber);
router.get('/', getAllBarbers);

module.exports = router;
