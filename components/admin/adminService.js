import Course from '../course/courseModel.js';
import User from '../users/userModel.js';
import Admin from './adminModel.js';

async function getAllCourses() {
  return await Course.findAll();
}

async function getAllUsers() {
  return await User.findAll();
}

async function getAllAdmins() {
  return await Admin.findAll();
}

async function getUserById(userId) {
  return await User.findByPk(userId);
}

async function getAdminById(adminId) {
  return await Admin.findByPk(adminId);
}

async function getCourseById(courseId) {
  return await Course.findByPk(courseId, {
    include: { model: User, as: 'members', through: { attributes: ['role'] } }
  });
}

async function createAdmin(admin) {
  return Admin.create(admin);
}

async function updateUserStatus(userId, status) {
  return User.update({ status }, { where: { id: userId } });
}

export default {
  getAllUsers, getAllAdmins, getAllCourses,
  getUserById, getAdminById, getCourseById,
  createAdmin, updateUserStatus
};