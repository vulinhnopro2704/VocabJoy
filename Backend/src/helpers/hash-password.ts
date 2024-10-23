import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	try {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	} catch (error) {
		throw new Error("fail to hash" + error);
	}
};

