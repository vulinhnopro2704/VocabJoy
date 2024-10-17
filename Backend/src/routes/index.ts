import express, { Express,Router } from "express"
import auth_Route from "./auth-route"
import user_router from "./user"
import vocab_router from "./vocab"
import { authentication } from "../middle-wares/authentication"



export const main_route:Router = express.Router()


main_route.use("/auth",auth_Route)

main_route.use("/user", user_router)
main_route.use("/vocab", vocab_router)