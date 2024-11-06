import Lesson from "../models/lesson";
import responseHandle, { success } from "../handlers/response-handler";
import LessonUser from "../models/lesson-user";
import { json } from "express";
import Vocab from "../models/vocab";

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
        const lessons = await Lesson.find().limit(3);
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

//UPDTATE LESSON
export const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        const updateLesson =  await lesson.updateOne({ $set: req.body});
        return responseHandle.success(res, json(updateLesson), "Update successful !");
    } catch (error) {
        return responseHandle.badRequest(res, "Update lesson failed");
    }
}

//DELETE LESSONS
export const deleteLessons = async (req, res) => {
    try {
        const { lessonIds } = req.body;

        if (!Array.isArray(lessonIds) || lessonIds.length === 0) {
            return responseHandle.badRequest(res, "Invalid Lesson ID list")
        }
        const deleteLessons = await Lesson.deleteMany({ _id: { $in: lessonIds } });
        if (deleteLessons.deletedCount === 0) {
            return responseHandle.badRequest(res, "No lessons found to delete.")
        }
        await LessonUser.deleteMany({ lessonId: { $in: lessonIds } });
        return res.status(200).json({ 
            success: true,
            message: "Successfully deleted lessons" 
        });
    } catch (error) {
        return responseHandle.badRequest(res, "Delete lessons failed");
    }
}

//ADD VOCAB TO LESSON
export const addVocabToLesson = async (req, res) => {
    try {
        const {lessonId, vocabId} = req.body;
        if (!lessonId || !vocabId) {
            return responseHandle.badRequest(res, "Missing Lesson Name or Vocabulary Name");
        }

        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return responseHandle.badRequest(res, "Lesson Name do not exist");
        }

        const vocab = await Vocab.findById(vocabId);
        if (!vocab) {
            return responseHandle.badRequest(res, "Vocab Name do not exist");
        }

        if (lesson.vocabulary.includes(vocab._id)) {
            return responseHandle.badRequest(res, "The lesson has included vocab");
        }

        lesson.vocabulary.push(vocab._id);
        const savedLesson = lesson.save()
        return responseHandle.success(res, savedLesson, "Add vocab successful");
        
    } catch (error) {
        return responseHandle.badRequest(res, "Add vocab to lesson failed");
    }
}

//DELETE VOCABS FORM LESSON
export const deleteVocabsFromLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { vocabIds } = req.body;
        if (!Array.isArray(vocabIds) || vocabIds.length === 0) {
            return responseHandle.badRequest(res, "vocabIds must be a non-empty array");
        }
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return responseHandle.badRequest(res, "Lesson not found");
        }
        lesson.vocabulary = lesson.vocabulary.filter(vocabId => !vocabIds.includes(vocabId.toString()));
        await lesson.save();
        return responseHandle.success(res, { lesson }, "Vocabulary deleted from lesson successfully");
    } catch (error) {
        return responseHandle.badRequest(res, "Delete vocabs from lesson failed");
    }
}

//GET 10 VOCAB FROM LESSON
export const getVocabFromLessonId = async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lesson = await Lesson.findById(lessonId).populate('vocabulary');
        
        if (!lesson) {
            return responseHandle.badRequest(res, "Lesson not found");
        }

        const vocabularies = lesson.vocabulary;

        if (vocabularies.length === 0) {
            return responseHandle.badRequest(res, "No vocab found in this lesson");
        }

        const numberOfVocabToReturn = Math.min(vocabularies.length, 10);

        const randomVocabularies = vocabularies.sort(() => 0.5 - Math.random()).slice(0, numberOfVocabToReturn);


        return responseHandle.success(res, {
            listvocab: randomVocabularies,
            count: randomVocabularies.length
        }, "Get vocabs successful");
    } catch (error) {
        console.error(error);
        return responseHandle.badRequest(res, "Get vocabs from lesson failed");
    }
}