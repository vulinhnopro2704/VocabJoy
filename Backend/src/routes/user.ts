import express, { Router } from "express";
import { userController } from "../controllers/userController";

const user_router : Router = express.Router();

user_router.get("/", userController.getAllUser);

user_router.get("/:id/vocabs-home", userController.getDiaryUser);

user_router.post("/:vocabId/:userId", userController.addVocabToUserDiary);

export default user_router;
