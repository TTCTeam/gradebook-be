import express from "express";
import {
  createCourse,
  createInvitation,
  getAllCoursesOfUser,
  getCourseById, getLecturers, getStudents,
  joinCourse,
  sendInvitationMail
} from './courseController.js';
import { verifyToken } from '../auth/authJwt.js';

const router = express.Router();

router.get("/", verifyToken, getAllCoursesOfUser);
router.get("/:courseId", verifyToken, getCourseById);
router.get("/:courseId/lecturers", verifyToken, getLecturers);
router.get("/:courseId/students", verifyToken, getStudents);
router.post("/", verifyToken, createCourse);
router.get("/:courseId/invite-link", verifyToken, createInvitation);
router.get("/:courseId/join/", verifyToken, joinCourse);
router.post("/:courseId/invite", verifyToken, sendInvitationMail);

export default router;
