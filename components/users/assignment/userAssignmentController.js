import userAssignmentService from "./userAssignmentService.js";

export const getAllAssignmentByUser = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req;
  try {
    const assignments = userAssignmentService.getAllAssignmentsOfUser(userId, courseId);
    res.status(200).send(assignments);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

export const updateUserAssignmentPoint = async (req, res) => {
  const { userAssignmentId } = req.params;
  const { point } = req.body;
  try {
    const userAssignment = await userAssignmentService.updateUserAssignmentPoint(userAssignmentId, point);
    res.status(200).json(userAssignment);
  } catch (e) {
    res.status(400).send(e.message);
  }
};