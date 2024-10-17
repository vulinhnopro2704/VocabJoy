import express, { Express,Router } from "express"
import auth_Route from "./auth-route"
import { authentication } from "../middle-wares/authentication"
import lesson_Route from "./lesson-route"
import user_router from "./user-route"
import lessonUser_Route from "./lesson-user-route"


export const main_route:Router = express.Router()


main_route.use("/auth",auth_Route)
main_route.use("/", lesson_Route)
main_route.use("/user", user_router)
main_route.use("/lessonUser", lessonUser_Route)