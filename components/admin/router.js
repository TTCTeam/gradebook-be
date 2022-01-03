import express from 'express';
import { getAllAdmins, getAllCourses, getAllUsers } from './adminController.js';

const adminRouter = express.Router();

adminRouter.get('/courses', getAllCourses);
adminRouter.get('/users', getAllUsers);
adminRouter.get('/admins', getAllAdmins);

export default adminRouter;