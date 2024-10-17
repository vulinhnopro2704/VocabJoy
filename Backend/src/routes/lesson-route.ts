import express, { Router } from "express";
import { addLesson, getAllLessons, getLessonsOfUser } from "../controllers/lesson-controller";

const lesson_Route: Router = express.Router();

//GET ALL LESSONS
lesson_Route.get("/", getAllLessons);

//ADD A LESSON
lesson_Route.post("/addLesson", addLesson);

//GET LESSONS OF USER
lesson_Route.get("/:userId/lessons", getLessonsOfUser);

export default lesson_Route;