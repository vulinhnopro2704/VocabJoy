import express, { Router } from "express";
import { addLesson, addVocabToLesson, deleteLessons, deleteVocabsFromLesson, getAllLessons, getLessonsOfUser, getVocabFromLessonId, updateLesson } from "../controllers/lesson-controller";

const lesson_Route: Router = express.Router();

//GET ALL LESSONS
lesson_Route.get("/", getAllLessons);

//ADD A LESSON
lesson_Route.post("/", addLesson);

//GET LESSONS OF USER
lesson_Route.get("/:userId/lessons", getLessonsOfUser);

//UPDATE LESSON
lesson_Route.put("/:lessonId", updateLesson);

//DELETE LESSONS
lesson_Route.delete("/", deleteLessons);

//ADD VOCAB TO LESSON
lesson_Route.post("/add-vocab", addVocabToLesson);

//DELETE VOCABS FROM LESSON
lesson_Route.delete("/:lessonId/deleteVocabs", deleteVocabsFromLesson);

//GET 10 VOCAB FROM LESSON
lesson_Route.get("/:lessonId/randomVocab", getVocabFromLessonId);

export default lesson_Route;