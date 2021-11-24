import express from "express";
import {
  createCourse,
  createInvitation,
  getAllCourses,
  getCourseById, getLecturers, getStudents,
  joinCourse,
  sendInvitationMail
} from './courseController.js';

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.get("/:courseId/lecturers", getLecturers);
router.get("/:courseId/students", getStudents);
router.post("/", createCourse);
router.get("/:courseId/invite-link", createInvitation);
router.get("/:courseId/join/", joinCourse);
router.get("/:courseId/invite", sendInvitationMail);

export default router;
