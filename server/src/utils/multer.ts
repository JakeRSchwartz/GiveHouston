import multer from 'multer';

export const storage = multer.diskStorage({
  destination: 'uploads/', // Save files to uploads/ folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

export const upload = multer({ storage });