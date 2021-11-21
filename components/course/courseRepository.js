import Course from './courseModel.js';

async function findById(courseId) {
  return Course.findByPk(courseId);
}

export default { ...Course, findById };
