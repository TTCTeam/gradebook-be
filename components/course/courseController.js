import courseService from './courseService.js';

export const getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.status(200).json(courses);
};

export const createCourse = async (req, res) => {
  const course = req.body;
  console.log(course);
  const addedCourse = await courseService.addCourse(course);
  res.status(201).json(addedCourse);
};
