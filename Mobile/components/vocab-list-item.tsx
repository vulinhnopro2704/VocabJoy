import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Vocab } from "@/data-types/vocabulary";
import { Volume2 } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { playSound } from "@/utils/play-sound";
import { Audio } from "expo-av";

type Props = {
	vocabulary: Vocab;
};

export default function VocabListItem({ vocabulary }: Props) {

	return (
		<Pressable style={styles.container}>
			<View style={styles.col1}>
				<View style={styles.vocabName}>
					<Text style={styles.h1}>{vocabulary.name}</Text>
					<Text style={styles.h3}>{vocabulary.type}</Text>
				</View>
			</View>
			<View>
				<Text style={styles.h3}>{vocabulary.pronunciation}</Text>
			</View>
			<View>
				<Text style={styles.h2}>{vocabulary.meaning}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		padding: 20,
		borderRadius: 10,
		backgroundColor: "#fff",
		gap: 20,
	},
	col1: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	vocabName: {
		gap: 5,
	},
	h1: {
		fontSize: 15,
		fontWeight: "bold",
	},
	h2: {
		fontSize: 13,
		fontWeight: "500",
	},
	h3: {
		fontSize: 12,
		fontWeight: "400",
	},
});
