import Course from '../course/courseModel.js';
import User from '../users/userModel.js';
import Admin from './adminModel.js';

async function getAllCourses() {
  return await Course.findAll();
}

async function getAllUsers() {
  return User.findAll();
}

async function getAllAdmins() {
  return Admin.findAll();
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function getAdminById(adminId) {
  return Admin.findByPk(adminId);
}

async function getCourseById(courseId) {
  return Course.findByPk(courseId, {
    include: { model: User, as: 'members', through: { attributes: ['role'] } }
  });
}

async function createAdmin(admin) {
  return Admin.create(admin);
}

async function updateUserInfo(userId, userInfo) {
  return User.update(userInfo, { where: { id: userId } });
}

async function findAdminByUsername(username) {
  return Admin.findOne({ where: { username } });
}

export default {
  getAllUsers, getAllAdmins, getAllCourses,
  getUserById, getAdminById, getCourseById,
  createAdmin, updateUserInfo, findAdminByUsername
};