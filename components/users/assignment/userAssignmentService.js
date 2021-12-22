import { AssignmentStatus } from "../../../contrains/assignment.js";
import Course from "../../course/courseModel.js";
import CourseMember from "../../course/member/courseMemberModel.js"
import User from "../userModel.js";
import UserAssignment from "./userAssignmentModel.js";

async function getAllAssignmentsOfUser(userId, courseId) {
  const user = await User.findOne({ where: { id: userId } });
  const studentId = user.username;
  console.log(user.toJSON());
  console.log(studentId, courseId);

  const courseMember = await CourseMember.findOne({
    where:{
      studentId, courseId
    }
  })
  let assignmentsResult=[];
  if (courseMember) {
    const assignments = await courseMember.getAssignments({
      where:{
        status: AssignmentStatus.PUBLIC
      }
    });
    for( const assignment of assignments){
     const userAssignment = await assignment.getSubmissions({
        where:{
          courseMemberId: courseMember.id
        },
        attributes:['id','point','assignmentId']
      });
      assignmentsResult.push(userAssignment);
    }
    console.log(assignments,'user assignment');
    if (assignmentsResult) {
      return assignmentsResult;
    }
  }
  return [];
}

async function updateUserAssignmentPoint(userAssignmentId, point) {
  const userAssignment = await UserAssignment.findByPk(userAssignmentId);
  if (!userAssignment) {
    throw Error('Assignment id does not exist.');
  }
  return userAssignment.update({ point });
}


export default {
  getAllAssignmentsOfUser,
  updateUserAssignmentPoint
};