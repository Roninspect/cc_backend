const Course = require('../models/course');
const User = require('../models/user');

const getAllCourses = async (req, res) => {
  try {
    let category = req.params.category;
    const courses = await Course.find({ category: category })
      .populate('instructor')
      .exec();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleCourses = async (req, res) => {
  try {
    var id = req.params.id;
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeaturedCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ isFeatured: true })
      .populate('instructor')
      .exec();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user;

    // Check if the user and course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: 'User or Course not found' });
    }

    // Check if the course is already in the user's cart
    if (user.cart.includes(courseId)) {
      return res.status(400).json({ error: 'Course already in the cart' });
    }

    // Add the course to the user's cart
    user.cart.push(courseId);

    await user.save();

    res.status(200).json({ message: 'Course added to the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const RemoveFromCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user;

    // Check if the user and course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: 'User or Course not found' });
    }

    // Check if the course is in the user's cart
    const courseIndex = user.cart.indexOf(courseId);

    if (courseIndex === -1) {
      return res.status(400).json({ error: 'Course not in the cart' });
    }

    // Remove the course from the user's cart
    user.cart.splice(courseIndex, 1);

    await user.save();

    res
      .status(200)
      .json({ message: 'Course removed from the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchCourseByTitle = async (req, res) => {
  try {
    const query = req.params.query;

    const result = await Course.aggregate([
      {
        $search: {
          index: "titleSearch",
          text: {
            query: query,
            path: "title",
          },
        },
      },
      {
        $lookup: {
          from: "instructors", // Assuming "instructors" is the name of the Instructor collection
          localField: "instructor", // Field from the Course collection
          foreignField: "_id", // Field from the Instructor collection
          as: "instructor", // Output field containing the joined data
        },
      },
      // Optionally, you can add more stages based on your requirements
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourses,
  getFeaturedCourse,
  addToCart,
  RemoveFromCart,
  searchCourseByTitle,
};
