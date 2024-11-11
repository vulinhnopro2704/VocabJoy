import { HttpException } from "../handlers/http_exception-handler";
import User from "../models/user";
import Vocab from "../models/vocab";

export const saveAllVocabForUserService = async () => {
	const userId = "66ec2581b2e1f7a168b8cbf2";

	try {
		// Fetch all vocabulary IDs
		const vocabularies = await Vocab.find().select("_id").exec();
		const vocabEntries = vocabularies.map((vocab) => ({
			vocab: vocab._id,
			count: Math.floor(Math.random() * 5) + 1,
		}));

		// Update the user with the vocabulary entries
		await User.findByIdAndUpdate(userId, {
			$set: { vocabulary: vocabEntries },
		});

		return true;
	} catch (error) {
		throw new HttpException(500, "Failed to save vocabularies for user");
	}
};
