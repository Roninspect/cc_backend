const express = require('express');
const auth = require('../middlewares/auth');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.use(auth);

categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = categoryRouter;
