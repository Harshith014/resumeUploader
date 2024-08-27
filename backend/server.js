/* This JavaScript code snippet is setting up a basic Express server for a web application. Here's a breakdown of what each part of the code is doing: */
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const app = express();

// Connect Database
connectDB();
app.use(cors({
    origin: [process.env.URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Init Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "build")));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
