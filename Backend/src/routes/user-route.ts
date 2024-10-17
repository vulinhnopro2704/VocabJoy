import express, { Router } from "express";
import { addVocabToUserDiary, getAllUser, getDiaryUser } from "../controllers/user-controller";


const user_router : Router = express.Router();

user_router.get("/", getAllUser);

user_router.get("/:id/vocabs-home", getDiaryUser);

user_router.post("/:vocabId/:userId", addVocabToUserDiary);

export default user_router;