import pkg from 'bcryptjs';
const { compareSync } = pkg;
import { createUser, findUserByEmail, findUserByUsername } from "../users/userService.js"
import adminService from '../admin/adminService.js';

export async function checkDuplicateUsername(username) {
  if (username) {
    const user = await findUserByUsername(username);
    if (user) {
      return true;
    }
  }
  return false;
}

export async function checkDuplicateEmail(email) {
  if (email) {
    const user = await findUserByEmail(email);
    if (user) {
      return user;
    }
  }
  return false;
}

export async function checkCredential(usernameOrEmail, password) {

  if (!password) return false;
  const hasEmail = await findUserByEmail(usernameOrEmail);
  const hasUsername = await findUserByUsername(usernameOrEmail);

  const user = hasEmail || hasUsername;

  if (user) {
    const passwordIsValid = compareSync(password, user.password);

    if (!passwordIsValid) {
      return false;
    }
    return user;

  }
  return null;
}

export async function createNewUser(newUser) {
  try {
    const userAdded = await createUser(newUser);
    return userAdded;
  } catch (err) {
    throw new Error({ message: err.message });
  }
}

export async function checkAdminCredential(username, password) {

  if (!password) return false;
  
  const user = await adminService.findAdminByUsername(username);

  if (user) {
    const passwordIsValid = compareSync(password, user.password);

    if (!passwordIsValid) {
      return false;
    }
    return user;

  }
  return null;
}