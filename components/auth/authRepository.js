import User from "../users/userModel.js";

export async function findUserByEmail(email) {
  return User.findOne({ where: { email: email } });
}

export async function findUserByUsername(username) {
  return User.findOne({ where: { username: username } }); 
}