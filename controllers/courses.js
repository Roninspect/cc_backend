const Course = require('../models/course');

const getAllCourses = async (req, res) => {
  try {
    let category = req.params.category;
    const courses = await Course.find({ category: category });
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

module.exports = {
  getAllCourses,
  getSingleCourses,
};
