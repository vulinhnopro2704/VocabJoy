import express, { Router } from "express";
import { getAllUserController, getIdByTokenController, getUserByIdController, saveWordForUserController } from "../controllers/user-controller";
import {userController} from "../controllers/userController";


const user_route :Router = express.Router()


user_route.get("/get-all-user", getAllUserController);
user_route.get("/get-user-by-id", getUserByIdController);
user_route.post("/save-word-for-user",saveWordForUserController);
user_route.get("/get-user-id",getIdByTokenController);
user_route.get("/", userController.getAllUser);
user_route.get("/:id/vocabs-home", userController.getDiaryUser);
user_route.post("/:vocabId/:userId", userController.addVocabToUserDiary);

export default user_route;