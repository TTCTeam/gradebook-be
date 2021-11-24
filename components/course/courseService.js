import pkg from 'sequelize';
import { INVITATION_EXPIRED_DAYS } from '../../contrains/invitation.js';
import { addDays } from '../../utils/dateUtils.js';
import invitationMailTemplate from '../../contrains/invitationMailTemplate.js';
import { sendMail } from '../mail-sender/mailSenderService.js';
import { nanoid } from 'nanoid';
import { MemberRoles } from '../../contrains/course.js';
import Course from "./courseModel.js";
import Invitation from "./invitation/invitationModel.js";
import User from "../users/userModel.js";
import CourseMember from "./members/courseMemberModel.js";
import { FRONT_END_HOSTNAME } from "../../contrains/host.js";

const { Op } = pkg;

async function getAllCourses(userId) {
  const user = await User.findByPk(userId);
  const courses = await user.getCourses();
  return courses.map(course => ({
    id: course.id,
    name: course.name,
    lecturer: course.lecturer,
    description: course.description
  }));
}

async function getCourseById(courseId) {
  return await Course.findByPk(courseId);
}

async function getRoleInCourse(courseId, userId) {
  const courseMember = await CourseMember.findOne({ where: { courseId, userId } });
  return courseMember?.role;
}

async function getLecturers(courseId) {
  const course = await Course.findByPk(courseId);
  const lecturers = await course.getMembers({
    through: { where: { role: { [Op.or]: [MemberRoles.LECTURER, MemberRoles.OWNER] } } },
    attributes: ['id', 'firstname', 'lastname', 'email'],
  });
  console.log(lecturers);
  return lecturers.map(lecturer => ({
    id: lecturer.id,
    firstname: lecturer.firstname,
    lastname: lecturer.lastname,
    email: lecturer.email,
    role: lecturer.CourseMember.role
  }));
}

async function getStudents(courseId) {
  const course = await Course.findByPk(courseId);
  const students = await course.getMembers({
      through: { where: { role: MemberRoles.STUDENT } },
      attributes:
        ['id', 'firstname', 'lastname', 'email'],
    }
  );
  console.log(students);
  return students.map(student => ({
    id: student.id,
    firstname: student.firstname,
    lastname: student.lastname,
    email: student.email,
    role: student.CourseMember.role
  }));
}

async function addCourse(course, userId) {
  try {
    const addedCourse = await Course.create(course);
    const model = await CourseMember.create({ courseId: addedCourse.id, userId, role: MemberRoles.OWNER });
    console.log(model);
    return addedCourse;
  } catch (e) {
    console.log(e);
  }
}

async function createInvitation(courseId, role = MemberRoles.STUDENT, isDisposable = false) {
  const course = await Course.findByPk(courseId);
  if (!course) {
    console.log(course);
    throw Error('The course id is invalid.');
  }

  const invitationId = nanoid();
  const expiredDate = addDays(Date.now(), INVITATION_EXPIRED_DAYS);
  const invitation = await Invitation.create({
      id: invitationId,
      role,
      expiredDate,
      isDisposable,
      courseId
    },
  );
  console.log(invitation);
  return {
    invitationLink: makeInvitationLink(invitation),
    expiredDate: invitation.expiredDate
  };
}

async function joinCourse(courseId, userId, invitationId) {
  const course = await Course.findByPk(courseId);
  const user = await User.findByPk(userId);
  const invitation = await Invitation.findOne({ where: { courseId, id: invitationId } });

  if (!course || !invitation || invitation.expiredDate < Date.now()) {
    throw Error('Invitation link is invalid or expired.');
  }
  // join to class
  await course.addMember(user, { through: { role: invitation.role } });
  const members = await course.getMembers();
  if (invitation.isDisposable) {
    await Invitation.destroy({ where: { id: invitationId } });
  }
  return members;
}

async function sendInvitationMail(courseId, emails, role) {
  const invitation = await createInvitation(courseId, role, false);
  const htmlContent = invitationMailTemplate(`${invitation.invitationLink} + ${role} + ${invitation.expiredDate}`);
  return await sendMail(emails, htmlContent);
}

function makeInvitationLink(invitation) {
  return `${FRONT_END_HOSTNAME}/courses/${invitation.courseId}/join?invitationId=${invitation.id}`;
}

export default {
  getAllCoursesOfUser: getAllCourses, addCourse,
  createInvitation, joinCourse, sendInvitationMail,
  getCourseById, getRoleInCourse, getLecturers, getStudents
};
