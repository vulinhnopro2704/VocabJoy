import { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Animated,
	TouchableOpacity,
	TouchableHighlight,
	Button,
	Easing,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from "react-native";
import { Colors } from "../constants/colors";
import { Audio } from "expo-av";
import SoundFillWord from "@/components/learn-english/fill-Word";
import OTPFillWord from "@/components/learn-english/fill-WordOTP";
import FlashCard from "@/components/learn-english/flash-card";
import LoadingIcon from "@/components/loadingicon";
import { playSound, playLocalSound } from "@/utils/play-sound";
import AnswerBar from "@/components/answer_bar";
import { router, useLocalSearchParams } from "expo-router";
import VideoStudy from "@/components/video_study";
import OutBar from "@/components/out-form";
import { useGetVocabLessonsQuery } from "@/lib/features/api/api-lesson-slice";
import ProcessBar from "@/components/process-bar";
import ResultScreen from "@/components/objective-test/result";

export default function StudyNewWord({}) {
	const { _id } = useLocalSearchParams();
	const idLesson = Array.isArray(_id) ? _id[0] : _id;
	const { data: res, error, isLoading } = useGetVocabLessonsQuery(idLesson);

	const [isCorrect, setIsCorrect] = useState(true);
	const [index, setIndex] = useState(0);
	const [screenLearn, setScreenLearn] = useState(1);
	const [sound, setSound] = useState<Audio.Sound>();
	const [widthRoad, setWidthRoad] = useState(0);
	const [text, setText] = useState("");
	const [showAnswerBar, setShowBox] = useState(false);
	const slideAnim = useRef(new Animated.Value(300)).current;
	const [video, setVideo] = useState(true);
	const [showOutBar, setOutBar] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const correctSoundEffect = useRef<Audio.Sound | null>(null);
	const start = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(start, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: false,
		}).start();
	});
	setTimeout(() => setVideo(false), 3000);

	async function handlerSubmitAnswerBar() {
		if (screenLearn == 3) {
			if (index == 5) {
				await setIsComplete(true);
				return;
			}
			await setIndex(index + 1);
			const x = widthRoad * (index + 1) + 20;
			setScreenLearn(1);
		} else setScreenLearn(screenLearn + 1);
		await handleChooseCorrectAnswer();
		hideAnwser();
	}

	function handlerSubmit() {
		Keyboard.dismiss();

		if (screenLearn == 1) {
			setScreenLearn(screenLearn + 1);
			return;
		} else if (
			res?.data.listvocab[index]?.name == text.trim().toLowerCase()
		) {
			setIsCorrect(true);
		} else if (
			res.data.listvocab[index]?.name != text.trim().toLowerCase()
		) {
			setIsCorrect(false);
		}
		showAnswer();
	}
	const handleChooseCorrectAnswer = async () => {
		const audioFile = require("@/assets/sound-effect/level-up-191997.mp3");
		const sound = await playLocalSound(audioFile);
		correctSoundEffect.current = sound;
		setSound(sound);
		await sound.playAsync();
	};

	function setTextParent(childText: string) {
		setText(childText);
	}

	function selectScreen() {
		switch (screenLearn) {
			case 1:
				return (
					<FlashCard vocab={res.data.listvocab[index]}></FlashCard>
				);
			case 2:
				return (
					<SoundFillWord
						setTextParent={setTextParent}
						vocab={res.data.listvocab[index]} 
					></SoundFillWord>
				);
			case 3:
				return (
					<OTPFillWord
						setTextParent={setTextParent}
						vocab={res.data.listvocab[index]}
					></OTPFillWord>
				);
		}
	}

	function nextWord() {
		setIndex(index + 1);
	}

	const showAnswer = () => {
		setShowBox(true);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
	const hideAnwser = () => {
		setTimeout(() => setShowBox(false), 500);
		setText("");
		Animated.timing(slideAnim, {
			toValue: 300,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	setTimeout(() => setVideo(false), 3000);

	function exit() {
		setOutBar(true);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}

	function continues() {
		setTimeout(() => setOutBar(false), 450);
		Animated.timing(slideAnim, {
			toValue: 300,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}

	if (video) {
		return <VideoStudy />;
	} else if (isComplete) {
		
		return (
			<ResultScreen
				text="Bạn đã hoàn thành bài học"
				correctAnswers={res.data.listvocab}
				incorrectAnswers={[]}
			/>
		);
	}

	return (
		!isLoading && (
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: "white",
					opacity: start,
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "white",
						opacity: showAnswerBar || showOutBar ? 0.3 : 1,
					}}
				>
					<TouchableOpacity style={styles.exitButton} onPress={exit}>
						<Text style={styles.header_iconX}>X</Text>
					</TouchableOpacity>
					<View style={styles.header}>
						<ProcessBar total={10} answeredCount={index} />
					</View>
					<View style={styles.body}>
						{isLoading ? (
							<LoadingIcon></LoadingIcon>
						) : (
							selectScreen()
						)}
					</View>

					<KeyboardAvoidingView
						style={{
							flex: 1,
							justifyContent: "flex-end",
							marginBottom: 60,
						}}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
					>
						<View style={styles.button}>
							<TouchableOpacity onPress={handlerSubmit}>
								<View style={styles.button_save}>
									<Text
										style={{
											fontSize: 14,
											color: "white",
											fontWeight: "600",
										}}
									>
										{screenLearn == 1
											? "Tiếp tục"
											: "Kiểm Tra"}
									</Text>
								</View>
							</TouchableOpacity>

							{screenLearn == 1 && (
								<TouchableOpacity onPress={nextWord}>
									<Text
										style={{
											color: "grey",
											textDecorationLine: "underline",
											fontWeight: 600,
										}}
									>
										Mình đã biết từ này
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</KeyboardAvoidingView>
				</View>

				{showAnswerBar && (
					<Animated.View
						style={[
							styles.answerBox,
							{ transform: [{ translateY: slideAnim }] },
						]}
					>
						<AnswerBar
							answer={res.data.listvocab[index]}
							onPress={handlerSubmitAnswerBar}
							isCorrect={isCorrect}
						/>
					</Animated.View>
				)}

				{showOutBar && (
					<Animated.View
						style={[
							styles.answerBox,
							{ transform: [{ translateY: slideAnim }] },
						]}
					>
						<OutBar onPress={continues} />
					</Animated.View>
				)}
			</Animated.View>
		)
	);
}

const styles = StyleSheet.create({
	exitButton: {
		position: "absolute",
		top: 40,
		right: 20,
	},
	header: {
		marginTop: 80,
		paddingHorizontal: 20,
	},
	cricle: {
		width: 40,
		height: 40,
		borderWidth: 2,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderColor: Colors.gray_500_shadow,
	},
	header_iconX: {
		fontSize: 25,
		fontWeight: "600",
		color: "grey",
	},
	iconBare: {
		width: 30,
		height: 30,
	},

	button: {
		backgroundColor: "white",
		alignItems: "center",
		gap: 20,
	},
	header_road: {
		width: "80%",
		height: 60,
		justifyContent: "center",
	},
	header_userRoad: {
		width: "90%",
		height: 25,
		borderRadius: 20,
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: Colors.gray_500,
	},
	header_yellowRoad: {
		backgroundColor: "#FF9900",
		height: 25,
		borderRadius: 20,
		alignItems: "flex-end",
		justifyContent: "center",
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	body: {
		flex: 4,
	},
	button_save: {
		width: 250,
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
		backgroundColor: Colors.blue,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.blue_shadow,
		borderBottomWidth: 3,
	},
	answerBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
});
