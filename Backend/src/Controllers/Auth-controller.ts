import { Request, Response } from "express";
import responseHandle from "../Handler/responseHandler";
import { createNewUser, getUserByEmail } from "../Services/Auth-service";
import {generateToken} from "../Helper/jwtToken.ts"
import user from "../Interface/User.ts";
import { comparePassword } from "../Helper/hashPassword.ts";



export const login = async (req:Request,res:Response)=>{
    const {email,password} = req.body as{
        email:string,
        password:string
    }
    if(!email||!password)
    {
        return responseHandle.badRequest(res,"username or password is null")
    }
    try {
        const user = await getUserByEmail(email)
        if(!user||!(comparePassword(password,user.account.password)))
        {
             return responseHandle.notFound(res,"User Not Found")
        }
        else {
            const token:string =  generateToken({name: user.name,email:email})
            return responseHandle.success(res,{token},"Authentication successful")
        }
    } catch (error) {
        return responseHandle.badRequest(res,"login fail")
    }
 
  
}


export const signUp = async (req:Request,res:Response)=>{
    const {name,password,date,email,phone} = req.body as {
        name:string,
        password:string,
        date:Date,
        email:string,
        phone:string
    }
    if(!name||!password||!date||!email)
    {
        return responseHandle.badRequest(res,"K du du lieu")
    }
    const newUser:user = {
        name: name,
        date:date,
        email:email,
        phone:phone,
        account:{
            password:password
        }
    }
    try {
        const user = await createNewUser(newUser)
        if(!user)
            return responseHandle.badRequest(res,"Cannnot Create User")
        else return responseHandle.success(res,user,"Create user success")
    } catch (error) {
        return responseHandle.badRequest(res,"Cant create User")
    }
}