import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";

type Props = {
	content: string;
	isPressed: boolean;
	handlePress: () => void;
};

export default function Option({ content, isPressed, handlePress }: Props) {
	return (
		<Pressable
			onPress={handlePress}
			style={[styles.container, isPressed && styles.onPress]}
		>
			<Text style={[styles.text, isPressed && styles.onPress]}>
				{content}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		shadowColor: "#E7E7E7",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 1,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 15,
		borderColor: "#E7E7E7",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	onPress: {
		backgroundColor: "#007AFF",
		color: "#fff",
	},
	text: {
		fontSize: 20,
		color: "#333",
	},
});
