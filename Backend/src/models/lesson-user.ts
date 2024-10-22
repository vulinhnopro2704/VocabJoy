import mongoose, { Model, model, Schema } from "mongoose";

interface lessonUser {
    userId: mongoose.Types.ObjectId,
    lessonId: mongoose.Types.ObjectId,
    number_of_world:Number
}

const lessonUserSchema = new Schema<lessonUser>({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'user'
    },
    lessonId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'lesson' 
    },
    number_of_world:{
        type:Number,
        default:0
    }
});

const LessonUser:Model<lessonUser> = model('lessonUser', lessonUserSchema);

export default LessonUser
