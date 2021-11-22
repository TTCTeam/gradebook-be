import { INVITATION_EXPIRED_DAYS } from '../../contrains/invitation.js';
import { addDays } from '../../utils/dateUtils.js';
import invitationMailTemplate from '../../contrains/invitationMailTemplate.js';
import { sendMail } from '../mail-sender/mailSenderService.js';
import { nanoid } from 'nanoid';
import { MemberRoles } from '../../contrains/course.js';
import Course from "./courseModel.js";
import Invitation from "./invitation/invitationModel.js";

async function getAllCourses() {
  return await Course.findAll();
}

async function addCourse(course) {
  try {
    return await Course.create(course);
  } catch (e) {
    console.log(e);
  }
}

async function createInvitation(courseId) {
  // check course is exist
  const course = await Course.findByPk(courseId);
  if (!course) {
    console.log(course);
    throw Error('sai course id');
  }

  const invitationId = nanoid();
  const expiredDate = addDays(Date.now(), INVITATION_EXPIRED_DAYS);
  const newInvitation = await Invitation.create({
    id: invitationId,
    courseId,
    memberRole: MemberRoles.STUDENT,
    expiredDate
  });
  console.log(newInvitation);
  return newInvitation;
}

async function joinCourse(courseId, invitationId) {
  const invitation = await Invitation.findOne({ where: { courseId, id: invitationId } });
  if (invitation) {
    // join to class
    console.log('Join');
    if (invitation.get('isDisposable')) {
      await Invitation.destroy({ where: { id: invitationId } });
    }
    return true;
  }
  return false;
}

async function sendInvitationMail(emails) {
  const htmlContent = invitationMailTemplate('ahihi');
  return await sendMail(emails, htmlContent);
}

export default {
  getAllCourses, addCourse,
  createInvitation, joinCourse, sendInvitationMail
};
