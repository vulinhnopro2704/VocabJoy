import { Schema,Model,model, Types } from "mongoose";
import { type } from "os";


interface user{
    isDeleted:boolean,
    email:string,
    name:string,
    date:Date,
    phone:string,
    account:{
        password:string,
        otp:string,
        otpExp:Date
    }
}


const userSchema:Schema<user> = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        unique:true
    },
    account: {
        type: {
            password: { type: String, required: true },
            otp: {
                type: String,
                default: null,
            },
            otpExp: {
                type: Date,
                default: null,
            },
        },
        required: true,
    },
    isDeleted: {
         type: Boolean, 
         default: false 
    },
    date:{
        type: Date,
    }
})

const User:Model<user> = model<user>('user',userSchema)

export default User