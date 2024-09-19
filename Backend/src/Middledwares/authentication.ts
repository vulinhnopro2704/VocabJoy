import { NextFunction, Request, Response } from "express";
import responseHandle from "../Handler/responseHandler";
import { verifiToken } from "../Helper/jwtToken";



export const authentication = (req:Request,res:Response,next:NextFunction)=>{

    const authenHeader:string = req.headers.authorization || ""
    if(!authenHeader)
        return responseHandle.unauthorize(res)
    const token:string = authenHeader.trim().split(" ")[1] || ""
    if(token=="")
        return responseHandle.unauthorize(res)
    if(!verifiToken(token))
        return responseHandle.unauthorize(res) 
    next()
} 