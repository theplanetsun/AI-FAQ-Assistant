const express = require('express');
const router = express.Router();
const {
  generateAIAnswer,
  generateAIFAQ,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const {
  validateAIAnswer,
  validateAIFaq,
} = require('../middleware/validationMiddleware');

// Protected routes to prevent API overuse/abuse
router.post('/answer', protect, validateAIAnswer, generateAIAnswer);
router.post('/generate-faq', protect, validateAIFaq, generateAIFAQ);

module.exports = router;
