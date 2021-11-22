import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;
import jsonwebtoken from 'jsonwebtoken';
import { EXPIRY, SALT, serect } from "./auth.config.js";
import { findUserByEmail, findUserByUsername } from '../users/userService.js';
import { checkDuplicateEmail, checkDuplicateUsername, createNewUser } from "./authService.js";

export const checkExistedEmailOrUsername = async (req, res, next) => {
  const { email, username } = req.body;

  let isDuplicatedEmail, isDuplicatedUsername = false;
  if (email) {
    isDuplicatedEmail = await checkDuplicateEmail((email));

    if (isDuplicatedEmail) {
      res.status(400).send({
        message: "Failed! Email is already in use"
      });
    }
  }
  if (username) {
    isDuplicatedUsername = await checkDuplicateUsername(username);

    if (isDuplicatedUsername) {
      res.status(400).send({
        message: "Failed! Username is already in use"
      });
    }
  }
  if (!isDuplicatedEmail && !isDuplicatedUsername) {
    next();
  }
}

export const signup = async (req, res, next) => {

  const { username, email, password } = req.body;
  const hashPassword = hashSync(password, SALT);

  try {
    const newUser = await createNewUser({
      username: username,
      email: email,
      password: hashPassword
    })
    res.status(200).send(newUser);

  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }

}

export const signin = async (req, res, next) => {

  const { username, email } = req.body;

  const hasEmail = await findUserByEmail(email);
  const hasUsername = await findUserByUsername(username);

  const user = hasEmail || hasUsername;

  const token = jsonwebtoken.sign({ id: user.id }, serect, {
    expiresIn: EXPIRY //10s
  });

  res.status(200).send({
    user: {
      email: user.email,
      username: user.username,
      id: user.id,
    },
    accessToken: token,
    expiresIn: EXPIRY
  });
}