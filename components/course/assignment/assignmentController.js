import assignmentService from './assignmentService.js';

export const getAllAssignmentsOfCourse = async (req, res) => {
  const { courseId } = req.params;
  console.log(req.params);
  const assignments = await assignmentService.getAllAssignments(courseId);
  res.status(200).json(assignments);
};

export const createAssignment = async (req, res) => {
  const { courseId } = req.params;
  const assignment = req.body;
  console.log(req.params);
  const addedAssignment = await assignmentService.createAssignment(courseId, assignment);
  res.status(201).json(addedAssignment);
};

export const editAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const assignment = req.body;
  const editedAssignment = await assignmentService.editAssignment(assignmentId, assignment);
  res.status(200).json(editedAssignment);
};

export const deleteAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  console.log(req.params);
  const deletedRows = await assignmentService.deleteAssignment(assignmentId);
  res.status(200).json(deletedRows);
};

export const updateOrder = async (req, res) => {
  const assignments = req.body;
  console.log(req.params);
  try {
    await assignmentService.updateOrder(assignments);
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e.message);
  }
};