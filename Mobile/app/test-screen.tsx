import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ObjectiveTest from "@/components/objective-test/objective-test";

export default function TestScreen() {
	return (
		<View style={styles.container}>
			<ObjectiveTest />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		flex: 1,
		backgroundColor: "#fff",
	},
});
