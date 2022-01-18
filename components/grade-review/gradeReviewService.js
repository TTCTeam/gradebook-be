import pkg from 'sequelize';
import GradeReview from './gradeReviewModel.js';
import CourseMember from '../course/member/courseMemberModel.js';
import { MemberRoles } from '../../contrains/course.js';
import User from '../users/userModel.js';
import Course from '../course/courseModel.js';
import Notification from '../notification/notificationModel.js';
import { socketIO } from '../../notificationSocket/notificationSocket.js';

const { Op } = pkg;

async function getAllByCourseIdAndUserId(courseId, userId) {
  const member = await CourseMember.findOne({ where: { courseId, userId } });
  if (!member) {
    throw Error("Wrong course id or user id");
  }
  const gradeReviews = await GradeReview.findAll({ where: { courseId } });
  const mappedGradeReviews = [];
  for (const gradeReview of gradeReviews) {
    const userAssignment = await gradeReview.getUserAssignment();
    const assignment = await userAssignment.getAssignment();
    const member = await userAssignment.getCourseMember();
    mappedGradeReviews.push({
      ...gradeReview.toJSON(),
      student: { studentId: member.studentId, fullname: member.fullname },
      assignment: { name: assignment.name, point: assignment.point },
      userAssignment: { id: userAssignment.id, point: userAssignment.point }
    });
  }
  let res = [];
  if (member.role === MemberRoles.STUDENT) {
    for (const gradeReview of mappedGradeReviews) {
      const userMapped = await User.findOne({ where: { username: gradeReview.student.studentId } });
      if (userMapped?.id === userId) {
        res.push(gradeReview);
      }
    }
    return res;
  }

  return mappedGradeReviews;
}

async function getGradeReviewById(gradeReviewId) {
  const gradeReview = await GradeReview.findByPk(gradeReviewId);
  const userAssignment = await gradeReview.getUserAssignment();
  const assignment = await userAssignment.getAssignment();
  const member = await userAssignment.getCourseMember();
  return {
    ...gradeReview.toJSON(),
    student: { studentId: member.studentId, fullname: member.fullname },
    assignment: { name: assignment.name, point: assignment.point },
    userAssignment: { id: userAssignment.id, point: userAssignment.point }
  };
}

async function createGradeReview(courseId, gradeReview) {
  const course = await Course.findByPk(courseId);
  const createdGradeReview = await GradeReview.create({ ...gradeReview, courseId });
  const notification = {
    title: course.name,
    content: `${course.name} has a new grade review`,
    courseId: course.id,
    createdAt: Date.now()
  };
  const lecturers = await course.getMembers({ through: { where: { role: { [Op.or]: [MemberRoles.LECTURER, MemberRoles.OWNER] } } } });
  for (const lecturer of lecturers) {
    await Notification.create({ ...notification, userId: lecturer.id });
  }
  socketIO.to(`${course.id}-${MemberRoles.LECTURER}`).emit('notification', notification);
  socketIO.to(`${course.id}-${MemberRoles.OWNER}`).emit('notification', notification);

  return createdGradeReview;
}

async function finalizeAssignmentPoint(courseId, gradeReviewId, point) {
  const gradeReview = await GradeReview.findByPk(gradeReviewId);
  const userAssignment = await gradeReview.getUserAssignment();
  if (!userAssignment) {
    throw Error('Assignment id does not exist.');
  }
  const updatedUserAssignment = userAssignment.update({ point });
  const course = await Course.findByPk(courseId);
  const assignment = await userAssignment.getAssignment();
  const student = await userAssignment.getCourseMember();
  const user = await student.getUser();
  const notification = {
    title: course.name,
    content: `Your grade review for ${assignment.name} had final decision`,
    courseId: course.id,
    createdAt: Date.now()
  };

  socketIO.to(`${user.id}`).emit('notification', notification);
  return updatedUserAssignment;
}

export default { getAllByCourseIdAndUserId, getGradeReviewById, createGradeReview, finalizeAssignmentPoint };
