import { INVITATION_EXPIRED_DAYS } from '../../contrains/invitation.js';
import invitationRepository from './invitation/invitationRepository.js';
import courseRepository from './courseRepository.js';
import { addDays } from '../../utils/dateUtils.js';
import invitationMailTemplate from '../../contrains/invitationMailTemplate.js';
import { sendMail } from '../mail-sender/mailSenderService.js';
import { nanoid } from 'nanoid';
import { MemberRoles } from '../../contrains/course.js';

async function getAllCourses() {
  return await courseRepository.findAll();
}

async function addCourse(course) {
  try {
    return await courseRepository.create(course);
  } catch (e) {
    console.log(e);
  }
}

async function createInvitation(courseId) {
  // check course is exist
  const course = await courseRepository.findById(courseId);
  if (!course) {
    console.log(course);
    throw "nvbnbn";
  }

  const invitationId = nanoid();
  const expiredDate = addDays(Date.now(), INVITATION_EXPIRED_DAYS);
  const newInvitation = await invitationRepository.create({
    id: invitationId,
    courseId,
    memberRole: MemberRoles.STUDENT,
    expiredDate
  });
  console.log(newInvitation);
  return newInvitation;
}

async function joinCourse(courseId, invitationId) {
  const invitation = await invitationRepository.findByCourseIdAndInvitationId(courseId, invitationId);
  if (invitation) {
    // join to class
    console.log('Join');
    if (invitation.getDataValue('isDisposable')){
      await invitationRepository.deleteById(invitationId);
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
