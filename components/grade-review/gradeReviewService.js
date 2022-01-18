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
  return member.role === MemberRoles.STUDENT
    ? mappedGradeReviews.filter(async (gradeReview) => {
      const userMapped = await User.findOne({ where: { username: gradeReview.student.studentId } });
      return userMapped?.id === userId;
    })
    : mappedGradeReviews;
}

export default { getAllByCourseIdAndUserId };
