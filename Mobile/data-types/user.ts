import { Vocab } from "./vocabulary";

// Define the type for the data object
export interface VocabForPracticeData {
	praticeVocab: Vocab[];
	count: number;
}

// Define the type for the main API response object
export interface ApiResponseVocabForPractice {
	success: boolean;
	data: VocabForPracticeData;
	message: string;
	statusCode: number;
}

export interface ApiResponseVocabByEachLevel {
	success: boolean;
	data: {
		vocabulary: Vocab[];
		count: number;
	};
	message: string;
	statusCode: number;
}
