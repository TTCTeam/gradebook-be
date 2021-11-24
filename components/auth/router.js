import express from 'express';
import passport from 'passport';
import { checkExistedEmailOrUsername, signin, signup } from './authController.js';
import { assignUserToCourse, isTecher, verifyGoogleToken, verifyToken } from './authJwt.js';

const authRouter = express.Router();

authRouter.post('/signin', passport.authenticate('local',{session:false}), signin);
authRouter.post('/signup',[checkExistedEmailOrUsername, signup]);
authRouter.get('/test', isTecher);
authRouter.post('/assignuser', assignUserToCourse);
authRouter.post('/access', verifyToken, (req,res, next)=>{res.status(200).send("Success!")});
authRouter.post('/signin_google',verifyGoogleToken, signin);

export default authRouter;