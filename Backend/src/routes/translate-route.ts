import express, { Router } from "express";
import { translate_controller } from "../controllers/translate-controller";

const translate_Route: Router = express.Router();

translate_Route.post("/translate", translate_controller);

export default translate_Route;
