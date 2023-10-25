const {Course,courseSchema} = require('../models/course');
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
    console.log(id);
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

const addToWishlist = async (req, res) => {
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
    if (user.wishlist.includes(courseId)) {
      return res.status(400).json({ error: 'Course already in the cart' });
    }

    // Add the course to the user's cart
    user.wishlist.push(courseId);

    await user.save();

    res.status(200).json({ message: 'Course added to the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const RemoveFromWishlist = async (req, res) => {
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
    const courseIndex = user.wishlist.indexOf(courseId);

    if (courseIndex === -1) {
      console.log(user.wishlist);
      return res.status(400).json({ error: 'Course not in the wishlist' });
    }

    // Remove the course from the user's cart
    user.wishlist.splice(courseIndex, 1);

    await user.save();

    res
      .status(200)
      .json({ message: 'Course removed from the wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const enrollingTheCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user;

    // Check if the user and course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ msg: 'User or Course not found' });
    }

    // Check if the course is already in the user's cart or enrolled list
    if (user.enrolled.includes(courseId)) {
      return res.status(400).json({ msg: 'Course already enrolled' });
    }

    // Add the course to the user's enrolled list
    user.enrolled.push({course});

    // Remove the course from the wishlist if it exists
    const wishlistIndex = user.wishlist.indexOf(courseId);
    if (wishlistIndex !== -1) {
      user.wishlist.splice(wishlistIndex, 1);
    }

    // Clear the user's cart
    user.cart = [];

    // Save the user and the modified course
    await user.save();

    res.status(200).json( course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const searchCourseByTitle = async (req, res) => {
  try {
    const query = req.params.query;
    const category = req.params.category; // Get the category from query parameters

    const pipeline = [];

    pipeline.push({
      $search: {
        index: "titleSearch",
        text: {
          query: query,
          path: "title",
          fuzzy: {},
        },
      },
    });

    // Add a $match stage if the category is provided
    if (category) {
      pipeline.push({
        $match: { category: category },
      });
    }

    pipeline.push({
      $lookup: {
        from: "instructors",
        localField: "instructor",
        foreignField: "_id",
        as: "instructor",
      },
    });

    pipeline.push({
      $addFields: {
        instructor: { $arrayElemAt: ["$instructor", 0] },
      },
    });

    pipeline.push({
      $project: {
        instructorData: 0, // Exclude the original array from the output
      },
    });

    const result = await Course.aggregate(pipeline);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourses,
  getFeaturedCourse,
  addToCart,
  RemoveFromCart,
  addToWishlist,
  RemoveFromWishlist,
  searchCourseByTitle,
  enrollingTheCourse,
};
