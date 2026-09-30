const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
    },

    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Technology',
          'Education',
          'Health',
          'Banking',
          'General',
          'Configuration',
        ],
        message:
          '{VALUE} is not a valid category. Choose from Technology, Education, Health, Banking, General, Configuration',
      },
      default: 'General',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator user reference is required'],
    },
  },
  {
    timestamps: true,
  }
);

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;