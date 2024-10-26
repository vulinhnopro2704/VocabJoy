import express, { Router } from "express";
import {
	addVocabToUserDiary,
	getAllUser,
	getAllUserController,
	getDiaryUser,
	getIdByTokenController,
	getUserByIdController,
	saveWordForUserController,
	getVocabToPractice
} from "../controllers/user-controller";

const user_route: Router = express.Router();

user_route.get("/get-all-user", getAllUserController);
user_route.get("/get-user-by-id", getUserByIdController);
user_route.post("/save-word-for-user",saveWordForUserController);
user_route.get("/get-user-id",getIdByTokenController);
user_route.get("/", getAllUser);
user_route.get("/:id/vocabs-home", getDiaryUser);
user_route.post("/:vocabId/:userId", addVocabToUserDiary);
user_route.get("/:id/practice-vocab", getVocabToPractice);

export default user_route;