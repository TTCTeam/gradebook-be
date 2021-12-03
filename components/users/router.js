import express from "express";
import { verifyToken } from "../auth/authJwt.js";
import { checkExistedStdudentId, getUserProfile, updateProfile } from "./userController.js";

const userRouter = express.Router();
userRouter.get('/',verifyToken,getUserProfile);
userRouter.put('/',verifyToken, checkExistedStdudentId,updateProfile);
export default userRouter;