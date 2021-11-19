import express from 'express';
import { assignUserToCourse, isTecher } from './authJwt.js';

const authRouter = express.Router();

authRouter.get('/signin',(req,res)=>{res.send([])});
authRouter.get('/signup',(req,res)=>{res.send([])});
authRouter.get('/test',isTecher);
authRouter.post('/assignuser',assignUserToCourse);


export default authRouter;