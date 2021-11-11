import express from "express";
import { createCourse, createInvitation, getAllCourses, joinCourse, sendInvitationMail } from './courseController.js';

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);
router.get("/:courseId/invite-link", createInvitation);
router.get("/:courseId/join/", joinCourse);
router.get("/:courseId/invite", sendInvitationMail);

export default router;
