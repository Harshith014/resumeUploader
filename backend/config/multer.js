/**
 * The above code defines a middleware function using Multer in Node.js for uploading images with file type validation and size limit.
 * @param file - The `file` parameter in the code represents the file that is being uploaded. It contains information about the file such as its name, mimetype, and originalname. This parameter is used in the `checkFileType` function to determine if the file type is allowed based on the specified filetypes (jpeg
 * @param cb - The `cb` parameter in the context of the `multer` library stands for callback. It is a function that you call to signal the completion of an asynchronous operation. In the provided code snippet, `cb` is used in the `filename` function and `checkFileType` function to handle
 * @returns The code exports a multer middleware configured for file upload. It sets up a storage engine that saves files to the './uploads/' directory with a unique filename based on the original filename and current timestamp. It also defines a function checkFileType to validate that uploaded files are of type jpeg, jpg, png, or gif.
 */
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single('image'); // 'image' is the field name

module.exports = upload;
