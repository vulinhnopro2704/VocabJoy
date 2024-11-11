import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type Props = {
	total: number;
	answeredCount: number;
};

export default function ProcessBar({ total, answeredCount }: Props) {
	// Validate parameters
	const validTotal = Number.isFinite(total) && total > 0 ? total : 1;
	const validAnsweredCount =
		Number.isFinite(answeredCount) && answeredCount >= 0
			? answeredCount
			: 0;

	// Calculate progress width
	const progressWidth =
		(validAnsweredCount / validTotal) * Dimensions.get("window").width;

	return (
		<View style={styles.progressBarContainer}>
			<View style={[styles.progressBar, { width: progressWidth }]}>
				<Image
					source={require("@/assets/images/shiba-inu-icon.png")}
					style={styles.icon}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	progressBarContainer: {
		height: 30,
		backgroundColor: "#e0e0e0",
		borderRadius: 15,
		marginBottom: 20,
		marginHorizontal: 20,
	},
	progressBar: {
		height: "100%",
		backgroundColor: Colors.primary,
		borderRadius: 15,
	},
	icon: {
		width: 40,
		height: 40,
		position: "absolute",
		right: -10,
		top: -4,
		zIndex: 10,
	},
});
