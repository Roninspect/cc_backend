const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema({
  instructorName: {
    required: true,
    type: String,
    trim: true,
  },
  profile: {
    required: true,
    type: String,
    trim: true,
  },
  Description: {
    required: true,
    type: String,
    trim: true,
  },
  worksAt: {
    required: true,
    type: String,
    trim: true,
  },
});
