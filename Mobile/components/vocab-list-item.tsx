import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Vocab } from "@/data-types/vocabulary";

type Props = {
	vocabulary: Vocab;
};

export default function ({ vocabulary }: Props) {
	return (
		<Pressable style={styles.container}>
			<View>
				<Text>{vocabulary.name}</Text>
				<Text>{vocabulary.type}</Text>
			</View>
			<Text>{vocabulary.pronunciation}</Text>
			<Text>{vocabulary.meaning}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	col1: {
		flex: 1,
		gap: 5,
		flexDirection: "column",
	},
});
