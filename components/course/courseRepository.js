import Course from './courseModel.js';

async function findAll() {
  return Course.findAll();
}

async function create(course) {
  return Course.create(course);
}

export default { findAll, create };
