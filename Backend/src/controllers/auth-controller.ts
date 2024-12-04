import { Request, Response } from "express";
import responseHandle from "../handlers/response-handler";
import { createNewUser, getUserByEmail } from "../services/auth-service";
import { generateToken } from "../helpers/jwt-token";
import user from "../interface/user";
import bcrypt from "bcryptjs";
import { genOTP } from "../helpers/genOTP";
import { userDataBase } from "../models/mail";
import { sendOtpEmail } from "../helpers/sendOtpEmail";
import { getNextDate } from "../helpers/getDate";

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
				userId :user._id,
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

export const sendOTP = async (req: Request, res: Response) => {
	const { email } = req.body as {
		email: string;
	};
	if (!email) {
		return responseHandle.badRequest(res, "Email is null");
	}
	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return responseHandle.notFound(res, "User Not Found");
		} else {
			let OTP = genOTP().toString()
			const userSend:userDataBase={
				name:user.name,
				email:user.email,
				otp:OTP
			} 
			const send = await sendOtpEmail(userSend)
			if(send) {
			user.account.otp = OTP;
			user.save()
			return responseHandle.success(res, user, "Send OTP successful");
			}
		 	return responseHandle.badRequest(res, "Send OTP fail");

		}
	} catch (error) {
		return responseHandle.badRequest(res, "Send OTP fail");
	}
};

export const confirmOTP = async (req: Request, res: Response) => {
	const { email, otp } = req.body as {
		email: string;
		otp: string;
	};
	if (!email || !otp) {
		return responseHandle.badRequest(res, "Email or OTP is null");
	}
	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return responseHandle.notFound(res, "User Not Found");
		} else {
			if (user.account.otp == otp) {
				user.account.otp = null;
				user.save();
				return responseHandle.success(res, user, "Confirm OTP successful");
			} else {
				return responseHandle.badRequest(res, "OTP is not correct");
			}
		}
	} catch (error) {
		return responseHandle.badRequest(res, "Confirm OTP fail");
	}
};confirmOTP
