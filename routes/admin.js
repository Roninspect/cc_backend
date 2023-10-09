const express = require('express');
const Course = require('../models/course');

const adminRouter = express.Router();

adminRouter.post('/add-course', async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
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

module.exports = adminRouter;
