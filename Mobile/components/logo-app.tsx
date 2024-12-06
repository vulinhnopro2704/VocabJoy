import { View, Image, StyleSheet } from "react-native";
import React from "react";

export default function LogoApp() {
	return (
		<View style={styles.container}>
			<Image
				source={require("@/assets/images/app-logo.png")}
				style={styles.logo}
				resizeMode="contain"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 120,
		height: 30,
	},
});
