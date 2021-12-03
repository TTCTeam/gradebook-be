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
  } else {
    res.status(400).send({
      message: "Failed! Email is undefine"
    });
    return;
  }

  if (username) {
    isDuplicatedUsername = await checkDuplicateUsername(username);

    if (isDuplicatedUsername) {
      res.status(400).send({
        message: "Failed! Username is already in use"
      });
    }

  } else {
    res.status(400).send({
      message: "Failed! Email is undefine"
    });
    return;
  }

  if (!isDuplicatedEmail && !isDuplicatedUsername) {
    next();
  }
}

export const signup = async (req, res, next) => {

  const { username, email, password, firstname, lastname } = req.body;
  const hashPassword = password ? hashSync(password, SALT) : null;

  const user = {
    username: username,
    email: email,
    password: hashPassword,
    firstname: firstname,
    lastname: lastname,
  }

  console.log(user);

  try {
    const newUser = await createNewUser(user)
    req.body = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      firstname: newUser.firstname,
      lastname: newUser.lastname
    }
    return next();
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }

}

export const signin = async (req, res, next) => {

  const { username, email } = req.body;
  console.log(req.body);

  let hasEmail, hasUsername;
  if(!email){
    hasEmail = await findUserByEmail(username);
    hasUsername = await findUserByUsername(username);
  }else{
    hasEmail = await findUserByEmail(email);
    hasUsername = await findUserByUsername(email);
  }
  
  const user = hasEmail || hasUsername;

  if (!user) {
    res.status(400).send({
      message: "Failed! Your account coudn't be found in database."
    });
  }

  const token = jsonwebtoken.sign({ id: user.id }, serect,{ algorithm: 'HS256',
    expiresIn: EXPIRY //10s
  });

  res.status(200).send({
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    id: user.id,
    token: token,
    expiresIn: EXPIRY
  });
}

export const checkExistedAndRegistAccount = async (req, res, next) => {
  const { email, username, firstname, lastname, password } = req.body;

  const isExistAccount = await checkDuplicateEmail(email);

  if (isExistAccount) {
    return next();
  } else {
    const user = {
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    }
    try {
      const newUser = await createNewUser(user)
      req.body = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        firstname: newUser.firstname,
        lastname: newUser.lastname
      }
      return next();

    } catch (err) {
      return res.status(500).send({
        message: err.message
      })
    }

  }
};