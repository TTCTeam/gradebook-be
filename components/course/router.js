import express from "express";
import {
  createCourse,
  createInvitation,
  getAllCoursesOfUser,
  getCourseById, getLecturers, getStudents,
  joinCourse,
  sendInvitationMail
} from './courseController.js';
import {
  createAssignment,
  deleteAssignment,
  editAssignment,
  getAllAssignmentsOfCourse, updateOrder
} from './assignment/assignmentController.js';

const router = express.Router();

router.get("/", getAllCoursesOfUser);
router.post("/", createCourse);
router.get("/:courseId", getCourseById);
router.get("/:courseId/lecturers", getLecturers);
router.get("/:courseId/students", getStudents);
router.get("/:courseId/invite-link", createInvitation);
router.get("/:courseId/join/", joinCourse);
router.post("/:courseId/invite", sendInvitationMail);
router.get("/:courseId/assignments", getAllAssignmentsOfCourse);
router.post("/:courseId/assignments", createAssignment);
router.put("/:courseId/assignments/:assignmentId", editAssignment);
router.delete("/:courseId/assignments/:assignmentId", deleteAssignment);
router.put("/:courseId/assignments", updateOrder);

export default router;
