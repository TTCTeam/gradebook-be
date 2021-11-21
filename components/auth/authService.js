import pkg from 'bcryptjs';
const { compareSync } = pkg;
import { getAllCourses } from "../course/courseController.js";
import { createUser, findUserByEmail, findUserByUsername } from "./authRepository.js"

export async function checkDuplicateUsername(username) {
  if(username){
    const user = await findUserByUsername(username);
    if (user) {
      return true;
    }
    return false;
  }
  return null;
}

export async function checkDuplicateEmail(email) {
  if (email) {
    const user = await findUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }
  return null;
}

export async function checkCredential(usernameOrEmail,password){
  const hasEmail = await findUserByEmail(usernameOrEmail);
  const hasUsername=await findUserByUsername(usernameOrEmail);

  const user = hasEmail||hasUsername;

  if(user){
    const passwordIsValid = compareSync(password, user.password);
    
    if(!passwordIsValid){
      return false;
    }

    return user;
  }
  return null;
}

export async function createNewUser(newUser){
  try{
    const userAdded = await createUser(newUser);
    return userAdded;
  }catch(err){
    throw new Error({message:err.message});
  }
}