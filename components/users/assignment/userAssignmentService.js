import Course from "../../course/courseModel.js";
import CourseMember from "../../course/member/courseMemberModel.js"
import User from "../userModel.js";

async function getAllAssignmentsOfUser(userId, courseId) {
  const user = await User.findOne({ where: { id: userId } });
  const studentId = user.username;

  const courseMember = await CourseMember.findOne({
    where:{
      studentId, courseId
    }
  })
  console.log(courseMember);
  if (courseMember) {
    const assignments = await courseMember.getSubmissions();
    console.log(assignments,'user assignment');
    if (assignments) {
      return assignments;
    }
  }
  return [];
}


export default {
  getAllAssignmentsOfUser,
}