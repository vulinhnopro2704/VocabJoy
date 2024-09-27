import { Request, Response } from "express";
import responseHandle from "../handlers/response-handler";
import { createNewUser, getUserByEmail } from "../services/auth-service";
import { generateToken } from "../helpers/jwt-token";
import { comparePassword } from "../helpers/hash-password";
import user from "../interface/user";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
	console.log("Call login");
	const { email, password } = req.body as {
		email: string;
		password: string;
	};
	if (!email || !password) {
		return responseHandle.badRequest(res, "username or password is null");
	}
	try {
		console.log(email, password);
		const user = await getUserByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.account.password))) {
			return responseHandle.notFound(res, "User Not Found");
		} else {
			const token: string = generateToken({
				name: user.name,
				email: email,
			});
			return responseHandle.success(
				res,
				{ token },
				"Authentication successful"
			);
		}
	} catch (error) {
		return responseHandle.badRequest(res, "login fail");
	}
};

export const signUp = async (req: Request, res: Response) => {
	console.log("Call Sign up");
	const { name, password, date, email, phone_number } = req.body as {
		name: string;
		password: string;
		date: Date;
		email: string;
		phone_number: string;
	};
	if (!name || !password || !date || !email || !phone_number) {
		return responseHandle.badRequest(res, "K du du lieu");
	}
	const newUser: user = {
		name: name,
		date: date,
		email: email,
		phone: phone_number,
		account: {
			password: password,
		},
	};
	try {
		const user = await createNewUser(newUser);
		if (!user) return responseHandle.badRequest(res, "Cannnot Create User");
		else return responseHandle.success(res, user, "Create user success");
	} catch (error) {
		return responseHandle.badRequest(res, "Cant create User" + error);
	}
};
