import express from "express";
import { createCourse, createInvitation, getAllCourses, joinCourse } from './courseController.js';

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);
router.get("/:courseId/invite", createInvitation);
router.get("/:courseId/join/", joinCourse);

export default router;
