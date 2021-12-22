import userAssignmentService from "./userAssignmentService.js";

export const getAllAssignmentByUser = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req;
  try {
    const assignments = await userAssignmentService.getAllAssignmentsOfUser(userId, courseId);
    res.status(200).send(assignments);
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }

}