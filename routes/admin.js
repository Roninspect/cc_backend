const express = require('express');
const Course = require('../models/course');
const Category = require('../models/category');

const adminRouter = express.Router();

adminRouter.post('/add-course', async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
      price,
      intro,
      isPaid,
      instructor,
      curriculum,
      category,
    } = req.body;

    let course = new Course({
      title: title,
      description: description,
      thumbnail: thumbnail,
      price: price,
      intro: intro,
      category: category,
      isPaid: isPaid,
      instructor: instructor,
      curriculum: curriculum,
    });

    course = await course.save();

    res.json(course);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.post('/add-category', async (req, res) => {
  try {
    const { name } = req.body;

    let category = Category({
      name: name,
    });

    category = await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = adminRouter;
