export type Vocab = {
	_id?: string;
	name?: string;
	pronunciation?: string;
	type?: string;
	image_link?: string;
	meaning?: string;
	description?: string;
	audio?: string;
	example?: string;
	__v?: number;
};

// Define the type for the license object
export type License = {
	name: string;
	url: string;
};

// Define the type for the phonetics object
export type Phonetic = {
	text?: string;
	audio: string;
	sourceUrl?: string;
	license?: License;
};

// Define the type for the definition object
export type Definition = {
	definition: string;
	synonyms: string[];
	antonyms: string[];
	example?: string;
};

// Define the type for the meaning object
export type Meaning = {
	partOfSpeech: string;
	definitions: Definition[];
	synonyms: string[];
	antonyms: string[];
};

// Define the type for the main API response object
export type VocabApiResponse = {
	word: string;
	phonetics: Phonetic[];
	meanings: Meaning[];
	license: License;
	sourceUrls: string[];
};
