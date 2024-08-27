/* This code snippet is defining a Mongoose schema for a user in a Node.js application. Here's a breakdown of what each part is doing: */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'default.jpg',
    },
    resume: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);