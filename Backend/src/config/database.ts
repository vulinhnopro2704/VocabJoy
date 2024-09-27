
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const url: string = process.env.MONGO_URL || "mongodb+srv://HaiNguyenDu:261024@demo.nbwwo.mongodb.net/LearnEnglish?retryWrites=true&w=majority&appName=Demo" ;

export const connectDb = async (): Promise<void> => {
	console.log(url)
	try {
		await mongoose.connect(url);
		console.log("connect success");
	} catch (error) {
		console.log(error);
	}
};
