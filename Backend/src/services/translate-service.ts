import { translate } from "@vitalets/google-translate-api";

export async function translate_from_english_to_vietnamese(text: string) {
	const result = await translate(text, {
		from: "en",
		to: "vi",
	});
	return result.text;
}
