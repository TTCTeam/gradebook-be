import express from "express";
import { getAllAssignmentByUser } from "./assignment/userAssignmentController.js";
import { checkExistedStdudentId, getUserProfile, updateProfile } from "./userController.js";

const userRouter = express.Router();
userRouter.get('/',getUserProfile);
userRouter.put('/', checkExistedStdudentId,updateProfile);
userRouter.get('/:courseId/assignments',getAllAssignmentByUser);
export default userRouter;