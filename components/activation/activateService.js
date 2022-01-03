import { nanoid } from "nanoid";
import { ACTIVATE_ACCOUNT_EXPIRED_TIME, ACTIVATE_MAIL_SUBJECT, mailActivateTemplate } from "../../contrains/active.js";
import USERSTATUS from "../../contrains/user.js";
import { addDays } from "../../utils/dateUtils.js";
import { sendMail } from "../mail-sender/mailSenderService.js";
import User from "../users/userModel.js";
import Activate from "./activateModel.js";

function makeActivateLink(activate) {
  return `${process.env.FRONT_END_HOSTNAME}/activating?activateId=${activate.id}`;
}

async function createActiveLink(userId) {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {

    throw new Error('Input user is not found.');
  }

  const activeId = nanoid();
  const expiredDate = addDays(Date.now(), ACTIVATE_ACCOUNT_EXPIRED_TIME);
  const existedActivation = await user.getActivate();

  let activation = {};

  if (!existedActivation) {
    activation = await Activate.create({
      id: activeId,
      expiredDate,
      userId: userId
    });
  } else {
    activation = await user.getActivate();
    activation.update({ expiredDate });
  }


  return {
    activationLink: makeActivateLink(activation),
    expiredDate: activation.expiredDate,
    user
  }

}

async function sendActivationMail(userId) {
  const activation = await createActiveLink(userId);
  const htmlContent = mailActivateTemplate(activation.user, activation);
  return sendMail(activation.user.email, htmlContent, ACTIVATE_MAIL_SUBJECT);
}

async function activateAccount(userId, activateId) {
  const user = await User.findByPk(userId);
  if (user.status === USERSTATUS.active) {
    return;
  }
  const activation = await Activate.findByPk(activateId);

  if (!user || !activation || activation.expiredDate < Date.now()) {
    throw new Error('Activation link is invalid or expired.')
  }

  // active account
  user.update({ status: USERSTATUS.active });
  await Activate.destroy({ where: { id: activateId } });
}

export default {
  sendActivationMail,
  activateAccount
}