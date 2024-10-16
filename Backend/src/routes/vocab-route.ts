import express,{Router} from "express"
import { createVocabController, getVocabByNameController, translateToVieController } from "../controllers/vocab-controller"
import { translateToVie } from "../services/vocab-service"


const vocab_route:Router = express.Router()

vocab_route.post("/create-vocabulary",createVocabController)
vocab_route.get("/find-vocabulary",getVocabByNameController)
vocab_route.get("/get-mean",translateToVieController)


export default vocab_route