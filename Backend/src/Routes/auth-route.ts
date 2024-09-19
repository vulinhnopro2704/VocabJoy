import express, { Router } from "express";
import { login, signUp } from "../Controllers/Auth-controller";

const auth_Route: Router = express.Router();

auth_Route.post("/login", login);
auth_Route.post("/signUp", signUp);

export default auth_Route;
