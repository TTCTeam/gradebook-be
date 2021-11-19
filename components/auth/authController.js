import { compareSync, hashSync } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { Jwt } = pkg;
import User from "../users/userModel.js";
import { SALT, serect } from "./auth.config.js";
import { checkDuplicateEmail, checkDuplicateUsername } from "./authService.js";

export const checkExistedEmailOrUsername = async (req, res, next) => {
  const { email, username } = req.body;
  let isDuplicate = false;
  if (email) {
    isDuplicate = await checkDuplicateEmail((email));
    if (isDuplicate) {
      res.status(400).send({
        message: "Failed! Email is already in use"
      });
      next();
    }
  }
  if (username) {
    isDuplicate = await checkDuplicateUsername(username);
    if (isDuplicate) {
      res.status(400).send({
        message: "Failed! Username is already in use"
      });
      next();
    }
  }
}

export const signup =async(req,res,next)=>{

  const {username,email,password} = req.body;
  const hashPassword = hashSync(password,SALT);

  try{
    const newUser = await User.create({
      username:username,
      email:email,
      password:hashPassword
    });

    res.status(200).send(newUser);

  }catch(err){
    res.status(403).send({
      message:err.message
    })
  }


}

export const signin = async(req,res,next)=>{

  const {username,email, password} = req.body;

  try{
    const existedUser = await User.findOne({where:{email:email}});
    const passwordIsValid = compareSync(password, existedUser.password);
    
    if(!passwordIsValid){
      res.status(401).send({
         accessToken:null,
         message:"Invalid Password!"
      })
    }

    const token = Jwt.sign({id:existedUser.id},serect,{
      expiresIn:1000 //10s
    });

    res.status(200).send({
      id:existedUser.id,
      email:email,
      role:null,
      accessToken:token
    });

  }catch(err){
    res.status(500).send({
      accessToken:null,
      message:err.message
    })
  }
}