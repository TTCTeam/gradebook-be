import UserAssignment from "./userAssignmentModel.js";

async function getAllAssignmentsOfUser(userId, courseId) {
  const assignments = await UserAssignment.findAll({ where: { userId, courseId } });
  if (assignments) {
    return assignments.map(assignment => ({
        id: assignment.id,
        point: assignment.point,
      })
    );
  }
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