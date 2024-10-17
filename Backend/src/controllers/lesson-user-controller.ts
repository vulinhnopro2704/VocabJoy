import responseHandle from "../handlers/response-handler";
import LessonUser from "../models/lesson-user";

//ADD LESSON-USER
export const addLessonUser = async (req, res) => {
    try {
        const newLessonUser = new LessonUser(req.body);
        const savedLessonUser = newLessonUser.save();
        return responseHandle.success(res, savedLessonUser, "Lesson-User added successfully")
    } catch (err) {
        console.log(err);
        return responseHandle.badRequest(res, "Internal Server Error")
    }
}

//GET ALL LESSON-USER
export const getAllLessonUser = async (req, res) => {
    try {
        const lessonUsers = await LessonUser.find();
        return responseHandle.success(res, lessonUsers, "Get All Lesson-User");
    } catch (err) {
        console.log(err);
        return responseHandle.badRequest(res, "Internal Server Error")
    }
}