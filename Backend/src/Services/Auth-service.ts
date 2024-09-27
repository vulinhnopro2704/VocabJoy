import { hashPassword } from "../Helper/hashPassword";
import user from "../Interface/User";
import User from "../Models/User";

export const getUserByEmail = async (email: string) => {
	try {
		return await User.findOne({ email: email }).select("-isDeleted -_id");
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
