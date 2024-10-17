import Lesson from "../models/lesson";
import responseHandle from "../handlers/response-handler";
import LessonUser from "../models/lesson-user";

//ADD LESSON
export const addLesson = async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        const savedLesson = await newLesson.save();
        return responseHandle.success(res, savedLesson, "Lesson added successfully");
    } catch (err) {
        console.log(err);
        return responseHandle.badRequest(res, "Internal Server Error")
    }
}

//GET ALL LESSONS
export const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        return responseHandle.success(res, lessons, "Get All Lessons");
    } catch (error) {
        return responseHandle.badRequest(res, "Get lessons failed");
    }
}

//GET LESSONS OF USER
export const getLessonsOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const lessons = await Lesson.find();
        const lessonUsers = await LessonUser.find({ userId }).lean();
        const lessonIdsOpened = lessonUsers.map(lessonUser => lessonUser.lessonId.toString());

        const response = lessons.map(lesson => ({
            title: lesson.name,
            description: lesson.description,
            hasOpenBefore: lessonIdsOpened.includes(lesson._id.toString()),
            image: lesson.image,
        }));
        return responseHandle.success(res, response, "Successfull");
    } catch (error) {
        return responseHandle.badRequest(res, "Get lessons failed");
    }
}