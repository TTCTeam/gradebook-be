import { getAllRoles } from "../roles/roleService.js";
import { checkDuplicateEmail, checkDuplicateUsername, testService } from "./authService.js";

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

export const checkExistedRole = async (req,res,next)=>{
  const {role}=req.body;

  if(req.body.role){
    const roles = await getAllRoles();

    if(!roles.includes(role)){
      res.status(400).send({message:"Failed! Role does not exist."});
    }
  }
  next();
}

export const testController = async (req,res,next)=>{
  const test = await testService();
  res.send(test);
}