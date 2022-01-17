import express from 'express';
import passport from 'passport';
import { sendChangePasswordMail, updateNewPassword } from '../password/passwordController.js';
import { checkExistedAndRegistAccount, checkExistedEmailOrUsername, signin, signup } from './authController.js';
import { verifyGoogleToken } from './authJwt.js';


const authRouter = express.Router();

authRouter.post('/signin', passport.authenticate('user-local', { session: false }), signin);
authRouter.post('/signup', [checkExistedEmailOrUsername, signup], signin);
authRouter.post('/signin_google', verifyGoogleToken, checkExistedAndRegistAccount, signin);
authRouter.post('/change-password',sendChangePasswordMail);
authRouter.post('/:userId',updateNewPassword);
export default authRouter;