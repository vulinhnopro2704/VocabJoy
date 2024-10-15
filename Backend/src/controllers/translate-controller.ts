import { Request, Response } from "express";
import { translate_from_english_to_vietnamese } from "../services/translate-service";

export const translate_controller = async (req: Request, res: Response) => {
	try {
		const { text } = req.body as { text: string };
		const result = await translate_from_english_to_vietnamese(text);
		return res.json(result);
	} catch (error) {
		return res.json("Error: " + error);
	}
};
