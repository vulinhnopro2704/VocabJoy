import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { Vocab } from "@/data-types/vocabulary";
import { Circle } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";

type Props = {
	correctAnswers: Vocab[];
	incorrectAnswers: Vocab[];
};

export default function ResultScreen({
	correctAnswers,
	incorrectAnswers,
}: Props) {
	// Calculate the percentage of correct answers
	const route = useRouter();
	const percentage =
		correctAnswers.length /
		Math.max(correctAnswers.length + incorrectAnswers.length, 1);

	return (
		<View style={styles.container}>
			{/* Close Button */}
			<TouchableOpacity style={styles.closeButton}>
				<Ionicons name="close" size={24} color="black" />
			</TouchableOpacity>

			{/* Circular Progress */}
			<View style={styles.circleContainer}>
				<Progress.Circle
					size={150}
					progress={percentage}
					showsText={true}
					formatText={() => `${Math.round(percentage * 100)}%`}
					color="#3b82f6"
					thickness={10}
					borderWidth={0}
					unfilledColor="#e0e0e0"
				/>
			</View>

			{/* Result Text */}
			<Text style={styles.resultText}>
				Bạn đã trả lời đúng {correctAnswers.length}/
				{correctAnswers.length + incorrectAnswers.length} từ vựng
			</Text>

			{/* Vocabulary List */}
			<ScrollView style={styles.vocabList}>
				{correctAnswers.map((vocab, index) => (
					<View key={`correct-${index}`} style={styles.vocabItem}>
						<Ionicons
							name="checkmark-circle"
							size={24}
							color="green"
						/>
						<View style={styles.vocabTextContainer}>
							<Text style={styles.vocabWord}>
								{vocab.name} ({vocab.type})
							</Text>
							<Text style={styles.vocabMeaning}>
								{vocab.meaning}
							</Text>
						</View>
					</View>
				))}
				{incorrectAnswers.map((vocab, index) => (
					<View key={`incorrect-${index}`} style={styles.vocabItem}>
						<Ionicons name="close-circle" size={24} color="red" />
						<View style={styles.vocabTextContainer}>
							<Text style={styles.vocabWord}>
								{vocab.name} ({vocab.type})
							</Text>
							<Text style={styles.vocabMeaning}>
								{vocab.meaning}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>

			{/* Continue Button */}
			<Pressable
				onPress={() => {
					route.replace("/home-screen");
				}}
				style={styles.continueButton}
			>
				<Text style={styles.continueButtonText}>Tiếp tục</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	closeButton: {
		position: "absolute",
		top: 20,
		left: 20,
	},
	circleContainer: {
		alignSelf: "center",
		marginTop: 60,
	},
	percentageText: {
		fontSize: 32,
		color: "#3b82f6",
		fontWeight: "bold",
	},
	resultText: {
		textAlign: "center",
		fontSize: 18,
		marginVertical: 20,
	},
	vocabList: {
		flex: 1,
		marginBottom: 20,
	},
	vocabItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	vocabTextContainer: {
		marginLeft: 10,
	},
	vocabWord: {
		fontSize: 16,
		fontWeight: "bold",
	},
	vocabMeaning: {
		fontSize: 14,
		color: "#666",
	},
	continueButton: {
		backgroundColor: "#3b82f6",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	continueButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
