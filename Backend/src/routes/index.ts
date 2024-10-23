import express, { Router } from "express"
import auth_Route from "./auth-route"
import vocab_route from "./vocab-route"
import user_route from "./user-route"
import lesson_Route from "./lesson-route"


export const main_route:Router = express.Router()


main_route.use("/auth",auth_Route);
main_route.use("/lesson", lesson_Route);
main_route.use("/user", user_route);
main_route.use("/vocabulary",vocab_route);