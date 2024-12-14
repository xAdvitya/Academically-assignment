import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} from "../controllers/course.controller.js";

router.get("/courses", getCourses);
router.get("/courses/:id", getCourse);
router.post("/admin/courses", verifyToken, addCourse);
router.put("/admin/courses/:id", verifyToken, updateCourse);
router.delete("/admin/courses/:id", verifyToken, deleteCourse);
router.post("/users/enroll/:courseId", verifyToken, enrollCourse);

export default router;
