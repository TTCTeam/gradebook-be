import UserAssignment from "./userAssignmentModel.js"

async function getAllAssignments(userId, courseId) {
  const assignments = UserAssignment.findAll({ where: { userId, courseId } });
  if(assignments){
    return (await assignments).map(assignment=>({
      id: assignment.id,
      point: assignment.point,
    })
    )
  }
}


export default {
  getAllAssignments
}