const multer = require('multer');
const path = require('path');

// where uploaded files will be stored
const storage = multer.diskStorage(
{
    destination: (req, file, cb) => 
    {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => 
    {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Allowed file types
const allowedFileTypes = 
[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// File filter
const fileFilter = (req, file, cb) => 
{
    if (allowedFileTypes.includes(file.mimetype)) 
    {
        cb(null, true);
    }
    else 
    {
        cb(new Error('Only PDF, JPG, PNG, DOC and DOCX files are allowed.'), false);
    }
};

// Create multer instance
const upload = multer(
{

    storage,
    fileFilter,
    limits: {fileSize: 10 * 1024 * 1024} //10MB
});

module.exports = upload;