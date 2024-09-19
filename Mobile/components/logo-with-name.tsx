import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function LogoWithName() {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/logo.png")}
				style={styles.logo}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#007AFF",
		borderRadius: 12,
	},
	logo: {
		width: 100,
		height: 100,
	},
});
