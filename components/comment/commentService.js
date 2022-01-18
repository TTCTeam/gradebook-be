import pkg from 'sequelize';
import Comment from './commentModel.js';
import { MemberRoles } from '../../contrains/course.js';
import Notification from '../notification/notificationModel.js';
import { socketIO } from '../../notificationSocket/notificationSocket.js';
import Course from '../course/courseModel.js';
import CourseMember from '../course/member/courseMemberModel.js';
import GradeReview from '../grade-review/gradeReviewModel.js';

const { Op } = pkg;

async function getAllByGradeReviewId(gradeReviewId) {
  return Comment.findAll({ where: { gradeReviewId } });
}

async function createComment(courseId, gradeReviewId, comment, userId) {
  const course = await Course.findByPk(courseId);
  const createdComment = await Comment.create({ ...comment, gradeReviewId });
  const notification = {
    title: course.name,
    content: `${comment.fullname} replied at grade review in ${course.name}`,
    courseId: course.id,
    createdAt: Date.now()
  };
  const member = await CourseMember.findOne({ where: { userId, courseId } });
  if (member.role === MemberRoles.STUDENT) {
    const lecturers = await course.getMembers({ through: { where: { role: { [Op.or]: [MemberRoles.LECTURER, MemberRoles.OWNER] } } }});
    for (const lecturer of lecturers) {
      await Notification.create({ ...notification, userId: lecturer.id });
    }
    socketIO.to(`${course.id}-${MemberRoles.LECTURER}`).emit('notification', notification);
    socketIO.to(`${course.id}-${MemberRoles.OWNER}`).emit('notification', notification);
  } else {
    const gradeReview = await GradeReview.findByPk(gradeReviewId);
    const userAssignment = await gradeReview.getUserAssignment();
    const student = await userAssignment.getCourseMember();
    const user = await student.getUser();
    await Notification.create({ ...notification, userId: user.id });
    socketIO.to(`${user.id}`).emit('notification', notification);
  }
  return createdComment;
}

export default { getAllByGradeReviewId, createComment };