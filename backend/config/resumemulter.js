/**
 * The above code defines a multer middleware function in Node.js for uploading PDF resumes with size limit and file type validation.
 * @param file - The `file` parameter in the code snippet represents the file that is being uploaded. It contains information about the file such as its name, mimetype, and originalname. This parameter is used in the `checkFileType` function to determine if the file type is valid (in this case, it checks
 * @param cb - The `cb` parameter in the context of the `multer` library stands for callback. It is a function that you call to either signal the completion of an operation or to handle errors during the operation.
 * @returns The code snippet provided is setting up a file upload configuration using Multer in Node.js. It configures the storage engine to save uploaded files to a specific destination with a custom filename. It also defines a function `checkFileType` to validate that the uploaded file is a PDF file. The upload configuration limits the file size to 10MB and filters files based on the PDF file type.
 */
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/resumes/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: PDF Only!');
    }
}

// Initialize upload
const uploadResume = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single('resume'); // 'resume' is the field name

module.exports = uploadResume;