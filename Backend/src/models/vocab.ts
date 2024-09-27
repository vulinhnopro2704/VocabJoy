import { Model, Models, Schema } from "mongoose";

interface vocab{
    name:string,
    pronounciation:string,
    type: string,
    image_link:string,
    meaning:string,
    description:string,
}


const vocabSchema: Schema<vocab> =  new Schema({
    name:{
        type:String,
        required:true
    },
    pronounciation:{
        type:String,
        required:true
    },
    type: {
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
    }

})


const Vocab:Model<vocab> = new Model("vocabulary",vocabSchema)

export default Vocab