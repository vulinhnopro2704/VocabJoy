import { Schema,Model,model, Types } from "mongoose";
import { type } from "os";


interface user {
    isDeleted: boolean
    email: string
    name: string
    date: Date
    phone: string
    account: {
      password: string;
      otp: string;
      otpExp: Date;
    },
    vocabulary: {
      vocab: String
      count: number
    }[]
  }
  
  const userSchema: Schema<user> = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true, 
    },
    phone: {
      type: String,
      unique: true,
    },
    account: {
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    vocabulary:{
        type: [
            {
              vocab: { type: Types.ObjectId, ref: "vocab"},
              count: { type: Number, default: 0 },
            },
          ],
          default: [],
    },
   
  });

const User:Model<user> = model<user>('user',userSchema)

export default User