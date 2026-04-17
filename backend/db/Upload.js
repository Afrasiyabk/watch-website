// // config/Upload.js
// import multer from 'multer';
// import path from 'path';

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Temporary storage for files
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   // Check if file is an image
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// // Configure multer with larger file size limits
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit per file
//     files: 4 // Maximum 4 files
//   }
// });

// export default upload;

// config/Upload.js

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  // 1. Logic for Category Uploads (Allow SVG and PNG)
  if (req.originalUrl.includes('/category')) {
    const categoryAllowedExt = ['.svg', '.png'];
    const categoryAllowedMime = ['image/svg+xml', 'image/png'];

    if (categoryAllowedExt.includes(ext) && categoryAllowedMime.includes(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Category icons must be in .svg or .png format!'), false);
    }
  } 
  // 2. Default rule for Products (Allow JPG, JPEG, PNG)
  else {
    const productAllowedExt = /jpeg|jpg|png/;
    const productAllowedMime = /image\/jpeg|image\/jpg|image\/png/;

    if (productAllowedExt.test(ext) && productAllowedMime.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png are allowed for products!'), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 4 
  }
});

export default upload;