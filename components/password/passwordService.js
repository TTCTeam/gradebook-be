import { mailRenewPasswordTemplate, PASSWORD_CHANGE_EXPIRED_TIME, PASSWORD_CHANGE_MAIL_SUBJECT } from "../../contrains/password.js";
import { sendMail } from "../mail-sender/mailSenderService.js";
import User from "../users/userModel.js";
import Password from "./paswordModel.js";
import pkg from 'bcryptjs';
import { SALT } from "../auth/auth.config.js";
import { nanoid } from "nanoid";
import { addDays } from "../../utils/dateUtils.js";
const { hashSync } = pkg;

function makeChangePasswordLink(passwordRequest) {
  return `${process.env.FRONT_END_HOSTNAME}/change-password?${process.env.USER_ID}=${passwordRequest.userId}&${process.env.PASSWORD_ID}=${passwordRequest.id}`;
}

async function createRenewPasswordRequest(email) {
  const userByEmail = await User.findOne({ where: { email: email } });
  const userByUsername = await User.findOne({ where: { username: email } });
  const user = userByEmail || userByUsername;
  if (!user) {

    throw new Error('Input user is not found.');
  }

  const passwordId = nanoid();
  const expiredDate = addDays(Date.now(), PASSWORD_CHANGE_EXPIRED_TIME);

  const existedPassword = await user.getPassword();

  let passwordRequestInfor = {};

  if (!existedPassword) {
    passwordRequestInfor = await Password.create({
      id: passwordId,
      expiredDate,
      userId: user.id
    });
  } else {
    existedPassword.update({ expiredDate });
    passwordRequestInfor = existedPassword;
  }

  return {
    link: makeChangePasswordLink(passwordRequestInfor),
    expiredDate: passwordRequestInfor.expiredDate,
    user
  }

}

async function sendRenewPasswordMail(email) {
  const passwordRequest = await createRenewPasswordRequest(email);
  const htmlContent = mailRenewPasswordTemplate(passwordRequest);
  return sendMail(passwordRequest.user.email, htmlContent, PASSWORD_CHANGE_MAIL_SUBJECT);
}

async function saveNewPassword(userId, passwordId, newPassword) {

  const user = await User.findByPk(userId);
  const password = await Password.findByPk(passwordId);

  if (!user || !password || user.id !== password.userId) {
    throw new Error('Your information is not valid.');
  }

  if (!newPassword || newPassword.trim() === '') {
    throw new Error('No password provided.');
  }

  // hash new password
  const newHashedPassword = hashSync(newPassword, SALT);

  // update new password.
  user.update({ password: newHashedPassword });
  await Password.destroy({ where: { id: passwordId } })

}

export default {
  sendRenewPasswordMail,
  saveNewPassword
}