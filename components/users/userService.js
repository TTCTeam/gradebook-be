import User from "../users/userModel.js";

export async function findUserById(userId){
  return await User.findByPk(userId);
}

export async function findUserByEmail(email) {
  return User.findOne({ where: { email: email } });
}

export async function findUserByUsername(username) {
  return User.findOne({ where: { username: username } });
}

export async function createUser(newUser) {
  return User.create({
    username: newUser.username,
    email: newUser.email,
    password: newUser.password
  });
}