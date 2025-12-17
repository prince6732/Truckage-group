const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/documents');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create tenant-specific folder
    const tenantId = req.user?.tenantId;
    if (!tenantId) {
      return cb(new ApiError(401, 'Tenant ID not found'), null);
    }

    const tenantDir = path.join(uploadsDir, tenantId.toString());
    if (!fs.existsSync(tenantDir)) {
      fs.mkdirSync(tenantDir, { recursive: true });
    }

    cb(null, tenantDir);
  },
  
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    
    // Clean filename (remove special characters)
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${cleanBaseName}_${timestamp}${extension}`;
    
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif'
  ];

  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only PDF and images (JPG, PNG, GIF) are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Only one file per request
  }
});

// Middleware for single file upload
const uploadSingle = (fieldName = 'document') => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);
    
    uploadMiddleware(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // Handle multer-specific errors
        if (error.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File too large. Maximum size is 10MB'));
        } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new ApiError(400, 'Unexpected file field'));
        } else if (error.code === 'LIMIT_FILE_COUNT') {
          return next(new ApiError(400, 'Too many files. Only one file allowed'));
        } else {
          return next(new ApiError(400, `File upload error: ${error.message}`));
        }
      } else if (error) {
        // Handle other errors (like file type validation)
        return next(error);
      }
      
      // File upload successful, continue to next middleware
      next();
    });
  };
};

// Utility function to delete uploaded file (for cleanup on error)
const deleteUploadedFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  }
};

module.exports = {
  uploadSingle,
  deleteUploadedFile
};