import  { Model, model, Schema } from "mongoose";

interface Vocab{
    name:string,
    pronunciation:string,
    type: string,
    image_link:string,
    meaning:string,
    description:string,
    audio:string
}


const vocabSchema: Schema<Vocab> =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    pronunciation:{
        type:String,

    },
    type: {
        type:String,
        enum:["VERB","NOUN","ADJECTIVE","ADVERB"],
        required:true
    },
    image_link:{
        type:String,
        default:""
    },
    description:{
        type:String,
        required:true
    },
    audio:{
        type:String
    }

})


const Vocab:Model<Vocab> = model("vocabulary",vocabSchema)

export default Vocab