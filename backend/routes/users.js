const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../middlware/auth');
const User = require('../models/User');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'pdf'], // allow both images and PDFs
    },
});

const upload = multer({ storage: storage });

// @route    GET api/user
// @desc     Get user details
// @access   Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/user
// @desc     Update user details
// @access   Private
router.put('/user', auth, upload.single('image'), async (req, res) => {
    const { name, email, password } = req.body;
    const userFields = {};

    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
    }
    if (req.file) userFields.image = req.file.path; // Cloudinary URL

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user details
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/user/resume
// @desc     Upload user resume
// @access   Private
router.put('/user/resume', auth, upload.single('resume'), async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user resume
        user.resume = req.file.path; // Cloudinary URL
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;