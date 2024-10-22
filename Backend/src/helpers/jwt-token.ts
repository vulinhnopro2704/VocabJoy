import jwt from "jsonwebtoken"

import dotenv from 'dotenv'

dotenv.config()
 const jwt_Sceret = process.env.JWT_SECRET || "Your Secret Key"


export const generateToken = (data:string | Object):string=>{
    try {
        return jwt.sign(data,jwt_Sceret)
    } catch (error) {
        throw new Error("Loi tao token: "+error)
    }
}

export const verifiToken =(token:string):string | jwt.JwtPayload=>{
    try {
        return jwt.verify(token,jwt_Sceret)
    } catch (error) {
        throw new Error("loi xac thuc token")
    }
}