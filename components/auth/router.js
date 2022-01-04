import express from 'express';
import passport from 'passport';
import { checkExistedAndRegistAccount, checkExistedEmailOrUsername, signin, signup } from './authController.js';
import { verifyGoogleToken } from './authJwt.js';


const authRouter = express.Router();

authRouter.post('/signin', passport.authenticate('user-local', { session: false }), signin);
authRouter.post('/signup', [checkExistedEmailOrUsername, signup], signin);
authRouter.post('/signin_google', verifyGoogleToken, checkExistedAndRegistAccount, signin);

export default authRouter;