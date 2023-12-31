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
  description: {
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

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
