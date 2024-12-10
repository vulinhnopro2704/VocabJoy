import express, { Router } from "express"
import auth_Route from "./auth-route"
import vocab_route from "./vocab-route"
import user_route from "./user-route"
import lesson_Route from "./lesson-route"
import {authentication} from "../middle-wares/authentication";


export const main_route:Router = express.Router()


main_route.use("/auth",auth_Route);
main_route.use("/lesson",authentication, lesson_Route);
main_route.use("/user",authentication, user_route);
main_route.use("/vocabulary",authentication,vocab_route);