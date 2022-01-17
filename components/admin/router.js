import express from 'express';
import passport from 'passport';
import {
  adminSignin,
  createAdmin,
  getAdminById,
  getAllAdmins,
  getAllCourses,
  getAllUsers,
  getCourseById,
  getUserById, updateUserStatus
} from './adminController.js';

const adminRouter = express.Router();

adminRouter.post('/signin',passport.authenticate('admin-local',{ session: false }), adminSignin);
adminRouter.get('/courses', getAllCourses);
adminRouter.get('/courses/:courseId', getCourseById);
adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:userId', getUserById);
adminRouter.get('/accounts', getAllAdmins);
adminRouter.get('/accounts/:adminId', getAdminById);
adminRouter.post('/accounts', createAdmin);
adminRouter.put('/users/:userId', updateUserStatus);

export default adminRouter;