import { getAllCourses } from "../course/courseController.js";
import { findUserByEmail, findUserByUsername } from "./authRepository.js"

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
