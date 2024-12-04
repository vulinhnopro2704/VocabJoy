import express, { Router } from "express";
import { confirmOTP, login, sendOTP, signUp } from "../controllers/auth-controller";

const auth_Route: Router = express.Router();

auth_Route.post("/login", login);
auth_Route.post("/signUp", signUp);
auth_Route.post("/sendOTP", sendOTP);
auth_Route.post("/confirmOTP", confirmOTP);
export default auth_Route;
