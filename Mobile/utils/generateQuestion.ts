import { Vocab } from "@/data-types/vocabulary";

// Enum để đại diện cho loại câu hỏi
enum QuestionType {
	EXAMPLE,
	NAME,
	MEANING,
}

// Interface cho câu hỏi trắc nghiệm
export interface MultipleChoiceQuestion {
	question: string;
	correctAnswer: string;
	options: string[];
	type: QuestionType;
	originalVocab?: Vocab;
}

// Hàm để tạo câu hỏi theo các loại khác nhau
export function generateQuestions(
	vocabList: Vocab[]
): MultipleChoiceQuestion[] {
	const questions: MultipleChoiceQuestion[] = [];

	vocabList.forEach((vocab) => {
		// Randomly select 1–2 question types
		const selectedTypes = getRandomItems(
			[QuestionType.EXAMPLE, QuestionType.NAME, QuestionType.MEANING],
			Math.floor(Math.random() * 2) + 1 // 1 or 2 types
		);

		// Generate questions based on the selected types
		selectedTypes.forEach((type) => {
			let question: MultipleChoiceQuestion;

			if (type === QuestionType.EXAMPLE) {
				question = {
					question: vocab.example!.replace(vocab.name!, "____"), // Replace the word with a blank
					correctAnswer: vocab.name!,
					options: generateOptions(
						vocabList,
						vocab.name!,
						QuestionType.EXAMPLE
					),
					type: QuestionType.EXAMPLE,
				};
			} else if (type === QuestionType.NAME) {
				question = {
					question: vocab.name!,
					correctAnswer: vocab.meaning!,
					options: generateOptions(
						vocabList,
						vocab.meaning!,
						QuestionType.NAME
					),
					type: QuestionType.NAME,
				};
			} else {
				question = {
					question: vocab.meaning!,
					correctAnswer: vocab.name!,
					options: generateOptions(
						vocabList,
						vocab.name!,
						QuestionType.MEANING
					),
					type: QuestionType.MEANING,
				};
			}

			if (
				question.correctAnswer &&
				question.options.length &&
				question.question
			) {
				question.originalVocab = vocab;
				questions.push(question);
			}
		});
	});

	// Shuffle questions array before returning
	return shuffle(questions);
}

// Hàm tạo lựa chọn trắc nghiệm, bao gồm đáp án đúng
function generateOptions(
	vocabList: Vocab[],
	correctAnswer: string,
	questionType: QuestionType
): string[] {
	// Lọc ra các câu trả lời sai dựa trên loại câu hỏi
	const incorrectAnswers = vocabList
		.filter((vocab) => {
			if (questionType === QuestionType.NAME) {
				return vocab.meaning !== correctAnswer;
			} else {
				return vocab.name !== correctAnswer;
			}
		})
		.map((vocab) =>
			questionType === QuestionType.NAME ? vocab.meaning : vocab.name
		);

	// Kết hợp đáp án đúng với 3 đáp án sai ngẫu nhiên
	const options = shuffle([
		correctAnswer,
		...getRandomItems(incorrectAnswers, 3),
	]);
	return options;
}

// Hàm trợ giúp để lấy các mục ngẫu nhiên từ một mảng
function getRandomItems(arr: any[], count: number): any[] {
	const shuffled = arr.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

// Hàm trợ giúp để xáo trộn mảng
function shuffle(array: any[]): any[] {
	return array.sort(() => Math.random() - 0.5);
}
