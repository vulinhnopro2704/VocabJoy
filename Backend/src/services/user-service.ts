import { HttpException } from "../handlers/http_exception-handler";
import User from "../models/user";

export const getAllUserService = async () => {
	const result = await User.find();
	if (!result) {
		throw new HttpException(404, "Notfound");
	}
	return result;
};

export const getUserByIdService = async (idUser: string) => {
	const result = await User.findById(idUser);
	if (!result) {
		throw new HttpException(404, "Not Found");
	}
	return result;
};

export const saveWordForUserService = async (
	userId: string,
	vocabId: string
) => {
	const user = await User.findOne({
		_id: userId,
		vocabulary: { $elemMatch: { vocab: vocabId } },
	});

	if (!user) {
		const result = await User.findByIdAndUpdate(userId, {
			$push: { vocabulary: { vocab: vocabId, count: 1 } },
		});
		return true;
	} else {
		user.vocabulary.forEach((data, index) => {
			if (data.vocab == vocabId) {
				user.vocabulary[index].count++;
			}
		});

		await user.save();
		throw new HttpException(400, "Tu da ton tai");
	}
};
