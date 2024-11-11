import axios from "axios";
import fs from "fs";
import path from "path";
import Vocab from "../models/vocab";

export const downloadAudio = async (url: string, filename: string) => {
	const filePath = path.resolve(__dirname, "../upload/audio", filename);
	const writer = fs.createWriteStream(filePath);

	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});
};

export const processVocabularies = async () => {
	try {
		// Fetch all vocabularies from MongoDB
		const vocabularies = await Vocab.find().exec();

		for (const vocab of vocabularies) {
			if (vocab.audio.startsWith("http")) {
				const filename = path.basename(vocab.audio);
				try {
					await downloadAudio(vocab.audio, filename);
					vocab.audio = filename; // Update the audio property with the filename
					await vocab.save(); // Save the updated vocabulary back to MongoDB
					console.log(`Downloaded and updated: ${filename}`);
				} catch (error) {
					console.error(`Failed to download ${filename}:`, error);
				}
			}
		}
	} catch (error) {
		console.error("Error processing vocabularies:", error);
	}
};
