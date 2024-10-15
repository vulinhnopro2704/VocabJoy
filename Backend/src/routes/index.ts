import express, { Router } from "express";
import auth_Route from "./auth-route";
import translate_Route from "./translate-route";

export const main_route: Router = express.Router();

main_route.use("/auth", auth_Route);
main_route.use("/", translate_Route);
