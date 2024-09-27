import { Model, Schema, Types } from "mongoose";



interface lesson{
    name: string,
    description: string,
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
    vocabulary: [{
        type:Types.ObjectId,
        default:[],
        ref:"vocabulary"
    }]
})



const Lesson:Model<lesson> = new Model("lesson",lessonSchema)


export default Lesson