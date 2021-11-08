import express from "express";
import { createClass, getClasses } from "./classesController.js";

const router = express.Router();

router.get("/", getClasses);
router.post("/", createClass);

export default router;
