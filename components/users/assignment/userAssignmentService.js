import CourseMember from "../../course/member/courseMemberModel.js"
import User from "../userModel.js";
import UserAssignment from "./userAssignmentModel.js";

async function getAllAssignmentsOfUser(userId, courseId) {
  const user = await User.findOne({ where: { id: userId } });
  const courseMember = await CourseMember.findOne({ where: { studenntId:user.username, courseId} });
  if(courseMember){
    return await courseMember.getSubmissions();
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