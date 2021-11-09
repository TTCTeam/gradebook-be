import express from "express";
import { createCourse, getAllCourses} from './courseController.js';

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);

export default router;
