import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Dimensions,
	Image,
} from "react-native";
import React, { useState } from "react";
import Question from "./question";
import Option from "./option";
import { Colors } from "@/constants/colors";

type Props = {
	variant: "variant1" | "variant2";
};

export default function ObjectiveTest() {
	const question = "Choose the correct answer";
	const ans = ["A", "B", "C", "D"];
	const totalQuestions = 10; // Example total number of questions
	const [selected, setSelected] = useState<number>(-1);
	const [answeredCount, setAnsweredCount] = useState<number>(0);

	const handlePress = (index: number) => {
		setSelected(index);
		setAnsweredCount((prevCount) => prevCount + 1);
	};

	const screenWidth = Dimensions.get("window").width;
	const progressWidth = (answeredCount / totalQuestions) * screenWidth;

	return (
		<View style={styles.container}>
			<View style={styles.progressBarContainer}>
				<View style={[styles.progressBar, { width: progressWidth }]}>
					<Image
						source={require("@/assets/images/shiba-inu-icon.png")}
						style={styles.icon}
					/>
				</View>
			</View>
			<Question
				content="His brave act has saved the child’s life"
				keyword="brave"
				question={question}
				variant="variant1"
			/>
			<View style={styles.list_option}>
				{ans.map((item, index) => (
					<Option
						key={index}
						content={item}
						isPressed={index == selected}
						handlePress={() => handlePress(index)}
					/>
				))}
			</View>
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>Trả lời</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 30,
		backgroundColor: "#fff",
	},
	progressBarContainer: {
		height: 30,
		backgroundColor: "#e0e0e0",
		borderRadius: 15,
		marginBottom: 20,
		position: "relative",
		marginHorizontal: 20,
	},
	icon: {
		width: 40,
		height: 40,
		position: "absolute",
		right: -15,
		top: -4,
		zIndex: 10,
	},
	progressBar: {
		height: "100%",
		backgroundColor: Colors.primary,
		position: "relative",
		borderRadius: 15,
	},
	progressText: {
		position: "absolute",
		width: "100%",
		textAlign: "center",
		top: 5,
		color: "#fff",
		fontWeight: "bold",
	},
	list_option: {
		flexDirection: "column",
		gap: 15,
		padding: 20,
	},
	button: {
		backgroundColor: "#007AFF",
		color: "#fff",
		padding: 20,
		borderRadius: 15,
		margin: 20,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
	},
});
