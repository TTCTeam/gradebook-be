import express from "express";
import { getAllAssignmentByUser, updateUserAssignmentPoint } from "./assignment/userAssignmentController.js";
import { checkExistedStdudentId, getUserProfile, updateProfile } from "./userController.js";

const userRouter = express.Router();
userRouter.get('/', getUserProfile);
userRouter.put('/', checkExistedStdudentId, updateProfile);
userRouter.get('/:courseId/assignments', getAllAssignmentByUser);
userRouter.put('/:courseId/assignments/:userAssignmentId', updateUserAssignmentPoint);

export default userRouter;