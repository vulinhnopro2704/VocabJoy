import Lesson from "../models/lesson";
import responseHandle from "../handlers/response-handler";


export const lessonController = {
    //ADD LESSON
    

    //GET ALL LESSONS
    getAllLessons: async (req, res) => {
        const { userId } = req.params;
        try {
            const lessons = await Lesson.find();
            return responseHandle.success(res, lessons, "Get All Lessons");
        } catch (error) {
            return responseHandle.badRequest(res, "Get lessons failed");
        }
    }
}