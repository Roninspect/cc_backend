const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  Access: {
    required: true,
    type: String,
    trim: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
