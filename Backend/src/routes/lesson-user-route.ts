import express, { Router } from "express";
import { addLessonUser, getAllLessonUser } from "../controllers/lesson-user-controller";

const lessonUser_Route = express.Router();

//ADD LESSON-USER
lessonUser_Route.post("/", addLessonUser);

//GET ALL LESSON-USER
lessonUser_Route.get("/", getAllLessonUser);

export default lessonUser_Route;