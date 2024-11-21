import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Vocab } from "@/data-types/vocabulary";
import { Volume2 } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { playLocalSound, playSound } from "@/utils/play-sound";
import { Audio } from "expo-av";
import { AUDIO_URL } from "@/constants/backend";

type Props = {
	answer: Vocab;
	onPress: () => void;
	isCorrect: boolean;
};

export default function AnswerBar({ isCorrect, answer, onPress }: Props) {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const correctSoundEffect = useRef<Audio.Sound | null>(null);
	const playSound = async(speed:number)=>{
		const audioFile =isCorrect?require("@/assets/sound-effect/correct-156911.mp3"):require("@/assets/sound-effect/wrong-answer-129254.mp3")
		const sound = await playLocalSound(audioFile);
		correctSoundEffect.current = sound;
		setSound(sound);
		await sound.playAsync();
    }
	
	useEffect(()=>{
		playSound(1)
	  },[])
	const handlePressVolume= async()=>{
     
        const { sound } = await Audio.Sound.createAsync(

          { uri:AUDIO_URL+answer.audio||""},

        )

	setSound(sound)
	await sound.setRateAsync(1, true);
	await sound.playAsync();
    }
	return (
		<View
			style={[
				styles.container,
				isCorrect
					? { backgroundColor: "#00BB00" }
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
		width: 60,
		height: 60,
		backgroundColor: "white",
		borderRadius: 60,
		elevation: 10,
		borderWidth:1,
		borderColor:Colors.gray_500,
		borderBottomWidth:4
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
		borderWidth:1,
		borderColor:Colors.gray_500,
		borderBottomWidth:4
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
