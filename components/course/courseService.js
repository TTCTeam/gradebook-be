import Course from './courseModel.js';

async function getAllCourses() {
  return await Course.findAll();
}

async function addCourse(course) {
  try {
    return await Course.create(course);
  } catch (e) {
    console.log(e);
  }
}

export default { getAllCourses, addCourse };
