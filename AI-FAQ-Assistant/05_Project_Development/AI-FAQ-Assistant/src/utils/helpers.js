const jwt = require('jsonwebtoken');

// Generates a signed JWT for a given user id
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here_must_be_long',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Sends a consistent success JSON response shape
const sendResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = { generateToken, sendResponse };
