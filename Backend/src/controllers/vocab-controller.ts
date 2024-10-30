import { NextFunction, Request, Response } from "express";
import { createVocabService,  getVocabByNameService, translateToVie } from "../services/vocab-service";
import responseHandle from "../handlers/response-handler";
import vocab from "../interface/vocab";
import { HttpException } from "../handlers/http_exception-handler";
import Vocab from "../models/vocab";


export const createVocabController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const newVocab:vocab = req.body 
        const result = await createVocabService(newVocab)
        responseHandle.created(res,result,"create successful")
    } catch (error) {
        next(error)
    }
}

export const get10VocabController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await Vocab.find().limit(10)
        responseHandle.success(res,{listVocab:result},"get successful")
    } catch (error) {
        next(error)
    }
}

export const getVocabByNameController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const { word } = req.query as {
            word :string
        }
        if(!word)
        {
            responseHandle.badRequest(res,"Invalid Data")
        }
        const result = await getVocabByNameService(word)
        responseHandle.success(res,result,"Find successful")
    } catch (error) {
        next(error)
    }
}

export const translateToVieController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {word} = req.query as {
            word:string
        }
        if(!word)
            throw new HttpException(400,"invalid input")
        const result = await translateToVie(word)
        responseHandle.success(res,{mean:result},"Translate success")
    } catch (error) {
        next(error)
    }
}

export const addVocab =  async(req,res) => {
    try{
        const {name, pronunciation, type}= req.body;
        const existingVocab = await Vocab.findOne({name, pronunciation, type});

        if(existingVocab)
        {
            return responseHandle.badRequest(res, "Vocab already exist");
        }
        
        const newVocab = new Vocab(req.body);   
        const saveVocab = await newVocab.save();
        return responseHandle.success(res, saveVocab, "Success");
    }catch(err)
    {
        return responseHandle.badRequest(res, "Failed");
    }
}

export const getAllVocab = async(req,res) => {
    try{
        const vocab = await Vocab.find().skip(20).limit(10);
        return responseHandle.success(res, vocab, "Success");
    }catch(err)
    {
        return responseHandle.badRequest(res, "Failed")
    }
}



export async function f_getVocabById(vocabId) {
    try {
        const vocab = await Vocab.findById(vocabId);
        if(!vocab)
        {
            return null;
        }

        return vocab;
    }catch(err) {
        console.log(err);
    }
}

export const getVocabById = async(req, res) => {
    try {
        const vocab = await f_getVocabById(req.params.id);
        if(!vocab)
        {
            return responseHandle.notFound(res, "Vocab not exist");
        }

        return responseHandle.success(res, vocab, "Success");

    }catch(err) {
        return responseHandle.badRequest(res, "Failed");
    }
}