import { NextFunction, Request, Response } from "express";
import responseHandle from "../handlers/response-handler";
import {
	getAllUserService,
	getUserByIdService,
	saveWordForUserService,
} from "../services/user-service";
import { HttpException } from "../handlers/http_exception-handler";
import { jwtDecode } from "jwt-decode";
import User from "../models/user";
import Vocab from "../models/vocab";
import { f_getVocabById } from "./vocab-controller";

let praticeVocab;

export const getAllUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllUserService();
		responseHandle.success(res, result, "Get successful");
	} catch (error) {
		next(error);
	}
};

export const getUserByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.query as {
			id: string;
		};
		if (!id) {
			throw new HttpException(400, "Invalid Id");
		}
		const result = await getUserByIdService(id);
		responseHandle.success(res, result, "Get User successful");
	} catch (error) {
		next(error);
	}
};

export const saveWordForUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { vocabId, userId } = req.body as {
			vocabId: string;
			userId: string;
		};
		if (!vocabId) throw new HttpException(400, "InValidData vocab");
		else if (!userId) throw new HttpException(400, "InValidData user");
		const result = await saveWordForUserService(userId, vocabId);
		responseHandle.success(res, { vocabId, userId }, "save Successful");
	} catch (error) {
		next(error);
	}
};

export const getIdByTokenController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authenHeader: string = req.headers.authorization || "";
		if (!authenHeader) return responseHandle.unauthorize(res);
		const token: string = authenHeader.trim().split(" ")[1] || "";
		if (!token) {
			throw new HttpException(400, "Cannot save Word");
		}
		const payload: any = jwtDecode(token);
		responseHandle.success(
			res,
			{ _id: payload.userId },
			"Get user ID success"
		);
	} catch (error) {
		next(error);
	}
};

export const getAllUser = async (req, res) => {
	try {
		const user = await User.find().select("name email phone vocabulary");
		return responseHandle.success(res, user, "All User");
	} catch (err) {
		return responseHandle.badRequest(res, "Failed");
	}
};

export const getDiaryUser = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user == null)
        {
            return responseHandle.badRequest(res, "Can't find user");
        }

        var sortedVocab = user.vocabulary.sort((a, b) => a.count - b.count);
        if(user.vocabulary.length > 30)
        {
            const randomLimit = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
            sortedVocab = sortedVocab.slice(0, randomLimit)
        }

        praticeVocab = sortedVocab;

        var le1 = 0, le2 = 0, le3 = 0, le4 = 0, le5 = 0;
        for(let i = 0; i < user.vocabulary.length; i++) {
            switch (user.vocabulary[i].count) {
                case 1:
                    le1++;
                    break;
                case 2:
                    le2++;
                    break;
                case 3:
                    le3++;
                    break;
                case 4:
                    le4++;
                    break;
                case 5:
                    le5++;
                    break;
                default:
                    break;
            }

        }
        const levels = {
            level1: le1,
            level2: le2,
            level3: le3,
            level4: le4,
            level5: le5,
        };


        const data = {
            total: user.vocabulary.length,
            levels: levels,
            practice: sortedVocab.length,
        };


        return responseHandle.success(res, data, "User");
    }catch(err)
    {
        return responseHandle.badRequest(res, "Failed");
    }
}

export const addVocabToUserDiary =  async(req,res) => {
    try{
        const user = await User.findById(req.params.userId);
        const vocab = await Vocab.findById(req.params.vocabId);
        if(!user) {
            return responseHandle.notFound(res, "Can't find user");
        }

        var vocabIndex = -1;
        for(let i = 0; i < user.vocabulary.length; i++) {
            if(user.vocabulary[i].vocab == req.params.vocabId) {
                vocabIndex = i;
                break;
            }
        }
        if(vocabIndex !== -1){
            if(user.vocabulary[vocabIndex].count < 5)
            {
                user.vocabulary[vocabIndex].count += 1;
            }
            else{
                return responseHandle.badRequest(res, "Vocab count cannot exceed 5");
            }
        }else
        {
            user.vocabulary.push({
                vocab: req.params.vocabId,
                count : 1
            });
        }
        const saveUser = await user.save();
        return responseHandle.success(res, saveUser, "Add vocab to diary succesfully");

    }catch(err)
    {
        console.log(err);
        return responseHandle.badRequest(res, "Failed");
    }
}

export const getVocabToPractice = async(req, res) => {
    try {
        const mapPracticeVocab = await Promise.all(
            praticeVocab.map(async (entry) => {
                const vocabDetail = await f_getVocabById(entry.vocab);

                if(vocabDetail) {
                    return {
                        _id: vocabDetail._id,
                        name: vocabDetail.name,
                        pronunciation: vocabDetail.pronunciation,
                        type: vocabDetail.type,
                        image_link: vocabDetail.image_link,
                        meaning: vocabDetail.meaning || "",
                        description: vocabDetail.description,
                        audio: vocabDetail.audio || "",
                        example: vocabDetail.example || "",
                        __v: vocabDetail.__v
                    }
                }
                return null;
            })
        )

        const filterVocab = mapPracticeVocab.filter((vocab) => vocab!= null);
        const data = {
            praticeVocab : filterVocab,
            count: filterVocab.length
        }

        return responseHandle.success(res, data, "Practice vocab");
    }catch(err) {
        console.log(err);
        return responseHandle.badRequest(res, "Failed");
    }
}

export const updateDiary = async(req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findById(req.params.id);

        if(!user)
        {
            return responseHandle.badRequest(res, "User not exist");
        }

        const vocabData =  req.body;

        console.log(vocabData);

        const vocabArray = vocabData.map(item => ({
            vocab: item.vocab,
            status: item.status
        }));

        console.log(vocabArray);

        vocabArray.forEach(vocabItem => {
            if(vocabItem.status) {
                const userVocab = user.vocabulary.find(userItem => userItem.vocab == vocabItem.vocab);
                if(userVocab) {
                    userVocab.count = userVocab.count < 5 ? userVocab.count + 1 : 1;
                }
            }
        });

        const saveUser = await user.save();

        return responseHandle.success(res, saveUser, "Update success");
    }catch(err) {
        return responseHandle.badRequest(res, "Update Failed");
    }
}