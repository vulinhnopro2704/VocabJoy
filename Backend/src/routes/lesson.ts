import express, { Router } from "express";
import { lessonController } from "../controllers/lessonController";

const route: Router = express.Router();

route.get("/:id/lessons", lessonController.getAllLessons);

export default route;