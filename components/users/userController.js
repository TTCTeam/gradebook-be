import { findUserByEmail, findUserById, findUserByUsername, updateUser } from "./userService.js";
import notificationService from '../notification/notificationService.js';

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
      status: user.status
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateProfile = async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  let { username } = req.body;
  const { userId } = req;

  try {
    const user = await findUserByEmail(email);
    if (user.username !== null && user.username !== username) {
      username = user.username;
    }
    await updateUser({
      firstname,
      lastname,
      username,
      email,
      userId
    });


    /* if(user.username !== username){
      mapStudentToTheirAssignment(user.username,username,user.id);
    }  */

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

};

export const checkExistedStdudentId = async (req, res, next) => {
  const { userId } = req;
  const { username } = req.body;

  try {
    const userFoundWithUsername = await findUserByUsername(username);
    const userFoundWithUserId = await findUserById(userId);
    if (userFoundWithUsername && userFoundWithUsername.id !== userFoundWithUserId.id) {
      return res.status(409).send({
        message: "Your enterd username is already in use."
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

export const getNotificationsByUser = async (req, res) => {
  const { userId } = req;
  const notifications = await notificationService.getNotificationsByUser(userId);
  res.status(200).json(notifications);
};
