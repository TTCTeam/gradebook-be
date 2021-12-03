import { findUserById, findUserByUsername, updateUser } from "./userService.js";

export const getUserProfile = async (req, res, next) => {
  const { userId } = req;
  try {

    const user = await findUserById(userId);
    res.status(200).send({
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user.id,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export const updateProfile = async (req, res, next) => {
  const { firstname, lastname, username, email } = req.body;
  const { userId } = req;

  try {
    const updatedUser = await updateUser({
      firstname,
      lastname,
      username,
      email,
      userId
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

}

export const checkExistedStdudentId = async (req,res, next)=>{
  const {userId}= req;
  const {username} = req.body;

  try{
    const userFoundWithUsername = await findUserByUsername(username);
    const userFoundWithUserId = await findUserById(userId);
    if(userFoundWithUsername&&userFoundWithUsername.id!==userFoundWithUserId.id){
      return res.status(409).send({
        message:"Your enterd username is already in use."
      });
    }
    next();
  }catch(err){
    return res.status(500).send({
      message:err.message
    });
  }
}