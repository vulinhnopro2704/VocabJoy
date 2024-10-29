import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Vocab } from "@/data-types/vocabulary";
import { Volume2 } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { playSound } from "@/utils/play-sound";
import { Audio } from "expo-av";

type Props = {
	answer: Vocab;
	onPress: () => void;
	isCorrect: boolean;
};

export default function AnswerBar({ isCorrect, answer, onPress }: Props) {
	const [sound, setSound] = useState<Audio.Sound | null>(null);

	useEffect(() => {
		const initialSound = async () => {
			if (answer.audio) {
				const { sound } = await playSound(answer.audio);
				setSound(sound);
			}
		};

		initialSound();

		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [answer.audio]);

	const handlePressVolume = () => {
		if (sound) {
			sound.playAsync();
		}
	};

	return (
		<View
			style={[
				styles.container,
				isCorrect
					? { backgroundColor: Colors.primary }
					: { backgroundColor: Colors.red },
			]}
		>
			<View style={styles.containerContent}>
				<Pressable onPress={handlePressVolume} style={styles.volume}>
					<Volume2 size={30} />
				</Pressable>
				<View style={styles.vocabInfor}>
					<Text style={[styles.whiteText, styles.h1]}>
						{answer.name}{" "}
						<Text style={styles.h3}>({answer.type})</Text>
					</Text>
					<Text style={[styles.whiteText, styles.h2]}>
						{answer.pronunciation}
					</Text>
					<Text style={[styles.whiteText, styles.h2]}>
						{answer.meaning}
					</Text>
					<Text style={[styles.whiteText, styles.h2]}>
						{answer.example}
					</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.button} onPress={onPress}>
				<Text style={styles.buttonText}>Tiếp tục</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		width: "100%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -20,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 10,
		flexDirection: "column",
		flex: 1,
		gap:10,
		paddingTop:50
	},
	containerContent: {
		flexDirection: "row",
		flex: 1,
		gap: 20,
	},
	volume: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		backgroundColor: "white",
		borderRadius: 60,
		shadowColor: "white",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
		elevation: 10,
	},
	vocabInfor: {
		gap: 10,
		flex: 1,
	},
	whiteText: {
		color: "white",
		fontSize: 20,
	},
	button: {
		backgroundColor: "#fff",
		width:"80%",
		height:50,
		color: "#141718",
		borderRadius: 20,
		margin:"auto",
		marginTop:30,
		marginBottom:50,
		justifyContent:"center",
		shadowColor: "grey",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
	},
	buttonText: {
		fontSize: 18,
		color: "#141718",
		textAlign: "center",
		fontWeight:"bold"
	},
	h1: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
	h2: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "medium",
	},
	h3: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "light",
	},
});
