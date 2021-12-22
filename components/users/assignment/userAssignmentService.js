import CourseMember from "../../course/member/courseMemberModel.js"
import User from "../userModel.js";

async function getAllAssignmentsOfUser(userId, courseId) {
  const user = await User.findOne({ where: { id: userId } });
  const courseMember = await CourseMember.findOne({ where: { studenntId:user.username, courseId} });
  if(courseMember){
    return await courseMember.getSubmissions();
  }
  return [];
}


export default {
  getAllAssignmentsOfUser,
}