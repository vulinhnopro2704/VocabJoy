import mongoose, { Schema, Types } from "mongoose";
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
const LessonUser = mongoose.model('lessonUser', lessonUserSchema);

module.exports = LessonUser;
