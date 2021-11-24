import express from 'express';
import passport from 'passport';
import { checkExistedEmailOrUsername, signin, signup } from './authController.js';
import { verifyGoogleToken } from './authJwt.js';


const authRouter = express.Router();

authRouter.post('/signin', passport.authenticate('local', { session: false }), signin);
authRouter.post('/signup', [checkExistedEmailOrUsername, signup]);
authRouter.post('/signin_google', verifyGoogleToken, signin);

export default authRouter;