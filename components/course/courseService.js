import { v4 as uuid } from 'uuid';
import { INVITATION_EXPIRED_DAYS } from '../../contrains/invitation.js';
import invitationRepository from './invitation/invitationRepository.js';
import courseRepository from './courseRepository.js';
import { addDays } from '../../utils/dateUtils.js';

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
  //
  const invitationCode = uuid();
  const expiredDate = addDays(Date.now(), INVITATION_EXPIRED_DAYS);
  const newInvitation = await invitationRepository.create({ courseId, invitationCode, expiredDate });
  console.log(newInvitation);
  return newInvitation;
}

async function joinCourse(courseId, invitationCode) {
  const invitation = await invitationRepository.findByCourseIdAndInvitationCode(courseId, invitationCode);
  if (invitation) {
    // join to class
    console.log('Join');
    console.log(invitation);
    return true;
  }
  return false;
}

export default {
  getAllCourses, addCourse,
  createInvitation, joinCourse
};
