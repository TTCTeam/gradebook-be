import Course from '../course/courseModel.js';
import User from '../users/userModel.js';
import Admin from './adminModel.js';

async function getAllCourses() {
  return await Course.findAll();
}

async function getAllUsers() {
  return await User.findAll();
}

async function getAllAdmin() {
  return await Admin.findAll();
}

export default { getAllUsers, getAllAdmins: getAllAdmin, getAllCourses };