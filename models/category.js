const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
