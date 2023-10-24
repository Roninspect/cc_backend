const express = require('express');
const auth = require('../middlewares/auth');
const {
  getAllCourses,
  getSingleCourses,
  getFeaturedCourse,
  addToCart,
  RemoveFromCart,
  searchCourseByTitle,
  addToWishlist,
  RemoveFromWishlist,
  enrollingTheCourse,
} = require('../controllers/courses');

const courseRouter = express.Router();

courseRouter.use(auth);

courseRouter.get('/all/:category', getAllCourses);

courseRouter.get('/featured', getFeaturedCourse);

courseRouter.get('/:id', getSingleCourses);

courseRouter.post('/add-to-cart/:courseId', addToCart);
courseRouter.post('/remove-from-cart/:courseId', RemoveFromCart);
courseRouter.post('/emptyCart', RemoveFromCart);



courseRouter.post('/add-to-wishlist/:courseId', addToWishlist);
courseRouter.post('/remove-from-wishlist/:courseId', RemoveFromWishlist);

courseRouter.post('/enroll-course/:courseId', enrollingTheCourse);


courseRouter.get('/testsearch/:query/:category?',searchCourseByTitle);



module.exports = courseRouter;
