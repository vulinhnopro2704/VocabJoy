import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Dimensions,
	Image,
	Animated,
	ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Question from "./question";
import Option from "./option";
import { Colors } from "@/constants/colors";
import { MultipleChoiceQuestion } from "@/utils/generateQuestion";
import { useRouter } from "expo-router";
import AnswerBar from "../answer_bar";
import { Vocab } from "@/data-types/vocabulary";
import { Audio } from "expo-av";
import { playLocalSound } from "@/utils/play-sound";
import ResultScreen from "./result";
import {
	useUpdateDiaryMutation,
	VocabWithStatus,
} from "@/lib/features/api/api-user-slice";
import { useAppSelector } from "@/lib/hook";
import ProcessBar from "../process-bar";

type Props = {
	questionList: MultipleChoiceQuestion[];
};

export default function ObjectiveTest({ questionList }: Props) {
	const [selected, setSelected] = useState<number>(-1);
	const [answeredCount, setAnsweredCount] = useState<number>(0);
	const [unansweredQuestions, setUnansweredQuestions] =
		useState<MultipleChoiceQuestion[]>(questionList);
	const [incorrectlyAnsweredQuestions, setIncorrectlyAnsweredQuestions] =
		useState<MultipleChoiceQuestion[]>([]);
	const [currentQuestion, setCurrentQuestion] =
		useState<MultipleChoiceQuestion | null>(unansweredQuestions[0] || null);
	const [prevAnswer, setPrevAnswer] = useState<Vocab | null>(null);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [showAnswerBox, setShowAnswerBox] = useState<boolean>(false);
	const [soundEffect, setSoundEffect] = useState<Audio.Sound | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const correctSoundEffect = useRef<Audio.Sound | null>(null);
	const inCorrectSoundEffect = useRef<Audio.Sound | null>(null);

	const router = useRouter();
	const slideAnim = useRef(new Animated.Value(300)).current;
	const incorrectVocabId = useRef<Vocab[]>([]);
	const correctVocabId = useRef<Vocab[]>([]);
	const userId = useAppSelector((state) => state.user._id);

	const [updateDiary, { data, isLoading, isSuccess }] =
		useUpdateDiaryMutation();

	useEffect(() => {
		return () => {
			// Unload the sound when the component unmounts
			correctSoundEffect.current?.unloadAsync();
			inCorrectSoundEffect.current?.unloadAsync();
		};
	}, []);

	useEffect(() => {
		// Update current question or set test completion status
		if (unansweredQuestions.length > 0) {
			setCurrentQuestion(unansweredQuestions[0]);
		} else {
			if (incorrectVocabId.current.length === 0) {
				incorrectVocabId.current = incorrectlyAnsweredQuestions.map(
					(q) => q.originalVocab!
				);
			}
			if (correctVocabId.current.length === 0) {
				correctVocabId.current = questionList
					.filter(
						(q) =>
							!incorrectVocabId.current.includes(q.originalVocab!)
					)
					.map((q) => q.originalVocab!);
			}
			const listVocabWithStatus: VocabWithStatus[] = questionList.map(
				(q) => ({
					vocab: q.originalVocab!,
					status: correctVocabId.current.includes(q.originalVocab!),
				})
			);
			updateDiary({ listVocab: listVocabWithStatus, userId });
			setIsCompleted(true);
			setTimeout(() => router.replace("/(tabs)/home-screen"), 10000);
		}
	}, [unansweredQuestions]);

	const handleChooseCorrectAnswer = async () => {
		const audioFile = require("@/assets/sound-effect/correct-156911.mp3");
		const sound = await playLocalSound(audioFile);
		correctSoundEffect.current = sound;
		setSoundEffect(sound);
		await sound.playAsync();
	};

	const handleChooseIncorrectAnswer = async () => {
		const audioFile = require("@/assets/sound-effect/wrong-answer-129254.mp3");
		const sound = await playLocalSound(audioFile);
		inCorrectSoundEffect.current = sound;
		setSoundEffect(sound);
		await sound.playAsync();
	};

	const handlePress = (index: number) => {
		setSelected(index);
	};

	const showAnswer = () => {
		setPrevAnswer(currentQuestion?.originalVocab ?? null);
		setShowAnswerBox(true);

		// Slide-up animation for AnswerBox
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const handleSubmitAnswer = async () => {
		if (currentQuestion && selected !== -1) {
			const isCorrectAnswer =
				currentQuestion.options[selected] ===
				currentQuestion.correctAnswer;
			setIsCorrect(isCorrectAnswer);

			isCorrectAnswer
				? await handleChooseCorrectAnswer()
				: await handleChooseIncorrectAnswer();
			showAnswer();
		}
	};

	const handShowAnswerBoxPress = () => {
		if (!isCompleted) {
			Animated.timing(slideAnim, {
				toValue: 300,
				duration: 300,
				useNativeDriver: true,
			}).start(() => setShowAnswerBox(false));
		}

		if (
			unansweredQuestions.length === 0 &&
			incorrectlyAnsweredQuestions.length > 0
		) {
			if (incorrectVocabId.current.length === 0) {
				incorrectVocabId.current = incorrectlyAnsweredQuestions.map(
					(q) => q.originalVocab!
				);
				console.log("incorrectVocabID --> " + incorrectVocabId.current);
				alert(
					"added to incorrecVocab --> " +
						incorrectVocabId.current.length
				);
			}
			if (correctVocabId.current.length === 0) {
				correctVocabId.current = questionList
					.filter(
						(q) =>
							!incorrectVocabId.current.includes(q.originalVocab!)
					)
					.map((q) => q.originalVocab!);
				console.log("CorrectVocabID --> " + incorrectVocabId.current);
				alert(
					"added to correctVocab --> " + correctVocabId.current.length
				);
			}
			setUnansweredQuestions(incorrectlyAnsweredQuestions);
			setIncorrectlyAnsweredQuestions([]);
		}

		if (isCorrect) {
			setAnsweredCount((prev) => prev + 1);
		} else {
			setIncorrectlyAnsweredQuestions((prev) => [
				...prev,
				currentQuestion!,
			]);
		}

		setUnansweredQuestions((prev) => prev.slice(1));
		setSelected(-1);
	};

	return (
		<ScrollView style={styles.container}>
			{isCompleted ? (
				<ResultScreen
					text={`Bạn đã trả lời đúng ${
						correctVocabId.current.length
					}/${
						correctVocabId.current.length +
						incorrectVocabId.current.length
					} từ vựng`}
					correctAnswers={correctVocabId.current}
					incorrectAnswers={incorrectVocabId.current}
				/>
			) : (
				<>
					<ProcessBar
						total={questionList.length}
						answeredCount={answeredCount}
					/>
					{currentQuestion && (
						<>
							<Question
								content={currentQuestion.question}
								keyword={currentQuestion.correctAnswer}
								variant="variant1"
							/>
							<View style={styles.listOption}>
								{currentQuestion.options.map(
									(option, index) =>
										option && (
											<Option
												key={index}
												content={option}
												isPressed={index === selected}
												handlePress={() =>
													handlePress(index)
												}
											/>
										)
								)}
							</View>
							<Pressable
								style={styles.button}
								onPress={handleSubmitAnswer}
							>
								<Text style={styles.buttonText}>Trả lời</Text>
							</Pressable>
						</>
					)}
				</>
			)}
			{showAnswerBox && (
				<Animated.View
					style={[
						styles.answerBox,
						{ transform: [{ translateY: slideAnim }] },
					]}
				>
					<AnswerBar
						answer={prevAnswer!}
						onPress={handShowAnswerBoxPress}
						isCorrect={isCorrect}
					/>
				</Animated.View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: "#fff",
		paddingHorizontal: 10,
	},
	listOption: {
		padding: 20,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 20,
		borderRadius: 15,
		margin: 20,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
	},
	answerBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
});
