const { generateAnswer, generateFAQPair } = require('../services/geminiService');
const { sendResponse } = require('../utils/helpers');

// @desc    Generate an AI answer for a given question (not persisted)
// @route   POST /api/ai/answer
// @access  Private
const generateAIAnswer = async (req, res, next) => {
  try {
    const { question } = req.body;

    const answer = await generateAnswer(question);

    return sendResponse(res, 200, 'AI answer generated successfully', {
      question,
      answer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate a full AI FAQ pair (question, answer, category) for a topic
// @route   POST /api/ai/generate-faq
// @access  Private
const generateAIFAQ = async (req, res, next) => {
  try {
    const { topic } = req.body;

    const result = await generateFAQPair(topic);

    return sendResponse(res, 200, 'FAQ generated successfully', result);
  } catch (error) {
    next(error);
  }
};

module.exports = { generateAIAnswer, generateAIFAQ };
