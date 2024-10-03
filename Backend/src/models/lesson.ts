import { model, Model, Schema, Types } from "mongoose";

interface lesson{
    name: string,
    description: string,
    meaning: string,
    image: string,
    vocabulary: Types.ObjectId[],
}

const lessonSchema:Schema<lesson> = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        default:""
    },
    meaning:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true,
        unique:true
    },
    vocabulary: [{
        type:Types.ObjectId,
        default:[],
        ref:"vocabulary"
    }],
})

const Lesson:Model<lesson> = model("lesson",lessonSchema)

export default Lesson