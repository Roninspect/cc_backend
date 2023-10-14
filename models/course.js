const mongoose = require('mongoose');
const Instructor = require('../models/instructor');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  isFreePreview: {
    type: Boolean,
    default: false,
  },
});

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    required: true,
    type: [contentSchema], // Change this line to make content an array of contentSchema
    // Initialize content as an empty array
  },
});

const courseSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },

  description: {
    required: true,
    type: String,
    trim: true,
  },

  price: {
    required: true,
    type: Number,
    trim: true,
  },

  thumbnail: {
    required: true,
    type: String,
    trim: true,
  },

  intro: {
    required: true,
    type: String,
    trim: true,
  },

  category: {
    required: true,
    type: String,
  },

  isPaid: {
    required: true,
    type: Boolean,
    default: true,
  },

  isFeatured: {
    required: true,
    type: Boolean,
    default: false,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the instructor model
    ref: 'Instructor', // The name of the related model
    required: true,
  },

  curriculum: [chapterSchema],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
