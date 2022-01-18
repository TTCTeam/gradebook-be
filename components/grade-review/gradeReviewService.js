import GradeReview from './gradeReviewModel.js';
import CourseMember from '../course/member/courseMemberModel.js';
import { MemberRoles } from '../../contrains/course.js';
import User from '../users/userModel.js';

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
  console.log(gradeReview);
  return GradeReview.create({...gradeReview, courseId});
}

export default { getAllByCourseIdAndUserId, getGradeReviewById, createGradeReview };
