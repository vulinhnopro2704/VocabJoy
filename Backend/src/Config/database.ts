import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const url: string = process.env.Mongo_URL || "";

export const connectDb = async (): Promise<void> => {
	try {
		await mongoose.connect(url);
		console.log("connect success");
	} catch (error) {
		console.log(error);
	}
};
