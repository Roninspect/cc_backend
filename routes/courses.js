const express = require('express');
const auth = require('../middlewares/auth');
const {
  getAllCourses,
  getSingleCourses,
  getFeaturedCourse,
  addToCart,
  RemoveFromCart,
  searchCourseByTitle,
} = require('../controllers/courses');

const courseRouter = express.Router();

courseRouter.use(auth);

courseRouter.get('/all/:category', getAllCourses);

courseRouter.get('/featured', getFeaturedCourse);

courseRouter.get('/:id', getSingleCourses);

courseRouter.post('/add-to-cart/:courseId', addToCart);
courseRouter.post('/remove-from-cart/:courseId', RemoveFromCart);

courseRouter.get('/search/:query',searchCourseByTitle);

module.exports = courseRouter;
