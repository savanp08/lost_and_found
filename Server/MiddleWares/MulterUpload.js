import multer from 'multer';

const storage = multer.memoryStorage();
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10000000
   
  // 10MB
    },
    fileFilter: function(req, file, cb) {
      if (file.mimetype.match(/image\/.*/)) {
        cb(null, true);
      } else {
        cb(new
   
  Error('Only image files are allowed!'), false);
      }
    }
  });