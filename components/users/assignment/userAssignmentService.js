import UserAssignment from "./userAssignmentModel.js"

async function getAllAssignmentsOfUser(userId, courseId) {
  const assignments = await UserAssignment.findAll({ where: { userId, courseId } });
  if (assignments) {
    return (await assignments).map(assignment => ({
      id: assignment.id,
      point: assignment.point,
    })
    )
  }
}


  export default {
    getAllAssignmentsOfUser,
  }