import assignmentService from "./assignmentService.js";

export const uploadStudentList = async (req, res) => {

  const { courseId } = req.params;
  const studentList = req.body;
  const filteredStudentList = studentList.filter(student => student.studentId !== '' && student.fullname !== '');
  try {

    await assignmentService.uploadStudentListWithStudentIdAndFullname(courseId, filteredStudentList);

    res.status(200).send({ message: "Upload successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Failed to upload student list" });
  }

};

export const getStudentList = async (req, res) => {
  const { courseId } = req.params;
  try {

    const userAssignments = await assignmentService.getAllUserAssginment(courseId);
    const filteredStudentList = userAssignments.filter(student => student.studentId !== null);
    res.status(200).send(filteredStudentList);
  } catch (err) {
    res.status(500).send({ message: "Failed to get student list" });
  }
};

export const getUserAssignmentListInAssignmentId = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const results = await assignmentService.getAssignmentsByAssignmentId(assignmentId);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

export const getAssignmentBoard = async (req, res) => {
  const { courseId } = req.params;
  try {
    const results = await assignmentService.getCourseGradeBoard(courseId);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }

};

export const uploadAssignmentsListByAssignmentId = async (req, res) => {

  const { assignmentId } = req.params;
  const studentList = req.body;

  const filteredStudentList = studentList.filter(student => student.studentId && student.point);
  try {

    await assignmentService.uploadAssignmentListbyAssignmentField(assignmentId, filteredStudentList);

    res.status(200).send({ message: "Upload successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Failed to upload student list" });
  }
};

export const publicAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    await assignmentService.publicAssignment(assignmentId);
    res.status(200).send({ message: "Public successfully!" });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export const testController = async (req, res) => {
  res.status(200).send({});
};
