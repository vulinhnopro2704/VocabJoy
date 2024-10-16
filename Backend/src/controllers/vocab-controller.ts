import { NextFunction, Request, Response } from "express";
import { createVocabService, getVocabByNameService, translateToVie } from "../services/vocab-service";
import responseHandle from "../handlers/response-handler";
import vocab from "../interface/vocab";
import { HttpException } from "../handlers/http_exception-handler";


export const createVocabController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const newVocab:vocab = req.body 
        const result = await createVocabService(newVocab)
        responseHandle.created(res,result,"create successful")
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