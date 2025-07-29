import express from "express";
import { login } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCoursebyId, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"


const router = express.Router();

router.route("/").post(isAuthenticated,createCourse)
router.route("/published-courses").get(isAuthenticated,getPublishedCourse)
router.route("/").get(isAuthenticated,getCreatorCourses)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/:courseId").get(isAuthenticated,getCoursebyId  )
router.route("/:courseId/lecture").post(isAuthenticated,createLecture)
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById)
router.route("/:courseId").patch(isAuthenticated,togglePublishCourse)


export default router;