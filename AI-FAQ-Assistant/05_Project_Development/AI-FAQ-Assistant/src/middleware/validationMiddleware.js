const { body, validationResult } = require('express-validator');

// Collects express-validator errors and forwards a 400 to the error handler
const runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => e.msg)
        .join(', '),
    });
  }

  next();
};

const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  runValidation,
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  runValidation,
];

const validateFAQ = [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required'),

  body('answer')
    .trim()
    .notEmpty()
    .withMessage('Answer is required'),

  body('category')
    .optional()
    .isIn([
      'Technology',
      'Education',
      'Health',
      'Banking',
      'General',
      'Configuration',
    ])
    .withMessage(
      'Category must be one of Technology, Education, Health, Banking, General, Configuration'
    ),

  runValidation,
];

const validateAIAnswer = [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required'),

  runValidation,
];

const validateAIFaq = [
  body('topic')
    .trim()
    .notEmpty()
    .withMessage('Topic is required'),

  runValidation,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateFAQ,
  validateAIAnswer,
  validateAIFaq,
};