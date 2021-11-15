import express from 'express';
import { testController } from './authController.js';

const authRouter = express.Router();

authRouter.get('/signin',(req,res)=>{res.send([])});
authRouter.get('/signup',(req,res)=>{res.send([])});
authRouter.get('/test',(req,res)=>{res.send([])});

export default authRouter;