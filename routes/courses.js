const express = require('express');

const { getAllCourses, getSingleCourses } = require('../controllers/courses');

const courseRouter = express.Router();

courseRouter.get('/all/:category', getAllCourses);

courseRouter.get('/:id', getSingleCourses);

module.exports = courseRouter;
