import { NextFunction, Request, Response } from "express"
import { HttpException } from "./http_exception-handler"

export const errorHandler = (err:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const status = err.status || 500
    res.status(status).json({
        success:false,
        message:err.message || "Internal Server Error",
        statusCode : status
        
    })
}

