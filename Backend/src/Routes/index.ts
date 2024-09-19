import express, { Express,Router } from "express"
import auth_Route from "./auth-route"



export const main_route:Router = express.Router()


main_route.use("/auth",auth_Route)