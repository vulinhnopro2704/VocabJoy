import express, { Router } from "express";
import { vocabController } from "../controllers/vocabController";

const vocab_router  : Router = express.Router();

vocab_router.post("/", vocabController.addVocab);

vocab_router.get("/", vocabController.getAllVocab);

export default vocab_router;