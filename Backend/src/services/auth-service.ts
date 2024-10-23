import { hashPassword } from "../helpers/hash-password";
import user from "../interface/user";
import User from "../models/user";

export const getUserByEmail = async (email: string) => {
	try {
		return await User.findOne({ email: email }).select("-isDeleted");
	} catch (error) {
		throw new Error("fail to get user" + error);
	}
};

export const createNewUser = async (user: user) => {
	try {
		user.account.password = await hashPassword(user.account.password);
		return await User.create(user);
	} catch (error) {
		throw new Error("Fail to create user" + error);
	}
};
