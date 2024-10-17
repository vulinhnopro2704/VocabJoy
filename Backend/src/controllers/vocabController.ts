import Vocab from "../models/vocab"
import responseHandle, { badRequest } from "../handlers/response-handler";

export const vocabController = {
    addVocab: async(req,res) => {
        try{
            const newVocab = new Vocab(req.body);
            const saveVocab = await newVocab.save();
            return responseHandle.success(res, saveVocab, "Success");
        }catch(err)
        {
            return responseHandle.badRequest(res, "Failed");
        }
    },
    
    getAllVocab: async(req,res) => {
        try{
            const vocab = await Vocab.find();
            return responseHandle.success(res, vocab, "Success");      
        }catch(err)
        {
            return responseHandle.badRequest(res, "Failed")
        }
    }
}