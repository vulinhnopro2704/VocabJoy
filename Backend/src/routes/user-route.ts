import express, { Router } from "express";
import { getAllUserController, getIdByTokenController, getUserByIdController, saveWordForUserController } from "../controllers/user-controller";


const user_route :Router = express.Router()


user_route.get("/get-all-user", getAllUserController)
user_route.get("/get-user-by-id", getUserByIdController)
user_route.post("/save-word-for-user",saveWordForUserController)
user_route.get("/get-user-id",getIdByTokenController)
export default user_route