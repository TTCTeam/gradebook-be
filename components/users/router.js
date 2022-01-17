import express from "express";
import { activateAccount, sendActivationMail } from "../activation/activateController.js";
import { getAllAssignmentByUser, updateUserAssignmentPoint } from "./assignment/userAssignmentController.js";
import { checkExistedStdudentId, getNotificationsByUser, getUserProfile, updateProfile } from "./userController.js";

const userRouter = express.Router();
userRouter.get('/', getUserProfile);
userRouter.put('/', checkExistedStdudentId, updateProfile);
userRouter.get('/:courseId/assignments', getAllAssignmentByUser);
userRouter.put('/:courseId/assignments/:userAssignmentId', updateUserAssignmentPoint);
userRouter.get('/activate', sendActivationMail);
userRouter.post('/activate', activateAccount);
userRouter.get('/notifications', getNotificationsByUser);
export default userRouter;