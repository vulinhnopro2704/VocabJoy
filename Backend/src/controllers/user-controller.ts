import { NextFunction, Request, Response } from "express"
import responseHandle from "../handlers/response-handler"
import { getAllUserService, getUserByIdService, saveWordForUserService } from "../services/user-service"
import user from "../interface/user"
import { HttpException } from "../handlers/http_exception-handler"
import { getVocabByNameService } from "../services/vocab-service"
import {jwtDecode} from "jwt-decode"


export const getAllUserController= async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await getAllUserService()
        responseHandle.success(res,result,"Get successful")
    } catch (error) {
        next(error)
    }
}

export const getUserByIdController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id} = req.query as {
            id:string
        }
        if(!id)
        {
            throw new HttpException(400,"Invalid Id")
        }
        const result = await getUserByIdService(id)
        responseHandle.success(res,result,"Get User successful")
    } catch (error) {
        next(error)
    }
}

export const saveWordForUserController= async (req:Request,res:Response,next:NextFunction)=>{
    try {
       const {vocabId,userId} = req.body as {
            vocabId:string,
            userId:string
       }
       if(!vocabId)
            throw new HttpException(400,"InValidData vocab")
        else if(!userId)
            throw new HttpException(400,"InValidData user")
       const result = await saveWordForUserService(userId,vocabId)
       responseHandle.success(res,{vocabId,userId},"save Successful")
    } catch (error) {
        next(error)
    }
}

export const getIdByTokenController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const authenHeader:string = req.headers.authorization || ""
        if(!authenHeader)
            return responseHandle.unauthorize(res)
        const token:string = authenHeader.trim().split(" ")[1] || ""
        if(!token)
        {
            throw new HttpException(400,"Cannot save Word")
        }
        const payload:any = jwtDecode(token)
        responseHandle.success(res,{_id: payload.userId},"Get user ID success")
        
    } catch (error) {
        next(error)
    }

}
