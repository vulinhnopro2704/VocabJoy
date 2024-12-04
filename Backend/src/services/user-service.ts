import { HttpException } from "../handlers/http_exception-handler";
import { hashPassword } from "../helpers/hash-password";
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

export const updatePasswordService = async (email:string,password:string)=>{	
	if(!email||!password){
		throw new HttpException(400, "Missing email or password")
	}
	const user = await User.findOne({email:email})
	if(!user){
		throw new HttpException(400, "User not found")
	}
	const Password:string = await hashPassword(password)
	user.account.password = Password
	user.save()
	return user
}
