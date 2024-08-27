/* This code snippet is a middleware function in Node.js using Express framework. Here's a breakdown of what it does: */
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.user = decoded.user;
    /* The `next()` function in the provided code is used in Express.js middleware to pass control to the next middleware function in the stack. When `next()` is called, it tells Express to move to the next middleware function defined in the application. This is commonly used to pass control from one middleware function to the next in the request-response cycle. */
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
