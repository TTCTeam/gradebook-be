import {  Jwt } from "jsonwebtoken";
import { serect } from "./auth.config";
verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  try {
    const decoded = await Jwt.verify(token,serect);
    req.userID = decoded;
  }catch (err){
    return res.status(401).send({
      message:"Unauthorized!"
    });
  }

  next();
}

isTecher = async (req,res,next)=>{
  
}