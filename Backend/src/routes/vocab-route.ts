import express, { Router } from "express";
import {
	addVocab,
	createVocabController,
	getAllVocab,
	getVocabByNameController,
	translateToVieController,
	getVocabById,
	get10VocabController,
} from "../controllers/vocab-controller";

const vocab_route: Router = express.Router();

vocab_route.post("/create-vocabulary", createVocabController);
vocab_route.get("/find-vocabulary", getVocabByNameController);
vocab_route.get("/get-mean", translateToVieController);
vocab_route.post("/", addVocab);
vocab_route.get("/", getAllVocab);
vocab_route.get("/:id", getVocabById);
vocab_route.get("/get-list-vocab", get10VocabController);
export default vocab_route;
