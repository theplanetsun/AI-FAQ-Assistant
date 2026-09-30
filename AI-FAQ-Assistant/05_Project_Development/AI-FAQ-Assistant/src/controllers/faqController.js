const FAQ = require('../models/FAQ');
const { sendResponse } = require('../utils/helpers');

// @desc    Create a new FAQ
// @route   POST /api/faqs
// @access  Private
const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category,
      createdBy: req.user._id,
    });

    return sendResponse(res, 201, 'FAQ created successfully', faq);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, 'FAQs retrieved successfully', {
      count: faqs.length,
      faqs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single FAQ by id
// @route   GET /api/faqs/:id
// @access  Public
const getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    return sendResponse(res, 200, 'FAQ retrieved successfully', faq);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an FAQ (author-owned only)
// @route   PUT /api/faqs/:id
// @access  Private
const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    if (
      faq.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this FAQ',
      });
    }

    const { question, answer, category } = req.body;
    faq.question = question ?? faq.question;
    faq.answer = answer ?? faq.answer;
    faq.category = category ?? faq.category;

    const updatedFAQ = await faq.save();

    return sendResponse(res, 200, 'FAQ updated successfully', updatedFAQ);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an FAQ (author-owned only)
// @route   DELETE /api/faqs/:id
// @access  Private
const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    if (
      faq.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this FAQ',
      });
    }

    await faq.deleteOne();

    return sendResponse(res, 200, 'FAQ deleted successfully', { id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Keyword search across question/answer/category
// @route   GET /api/faqs/search?q=configure
// @access  Public
const searchFAQs = async (req, res, next) => {
  try {
    const q = req.query.q || '';

    const faqs = await FAQ.find({
      $or: [
        { question: { $regex: q, $options: 'i' } },
        { answer: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ],
    }).populate('createdBy', 'name email');

    return sendResponse(res, 200, 'FAQs retrieved successfully', {
      count: faqs.length,
      faqs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  searchFAQs,
};
