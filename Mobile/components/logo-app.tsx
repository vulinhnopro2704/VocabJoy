import {View, Image, StyleSheet, Pressable} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

export default function LogoApp() {
	const router = useRouter();

	return (
		<Pressable onPress={() => {
			router.replace("/(tabs)/home-screen");
		}} style={styles.container}>
			<Image
				source={require("@/assets/images/app-logo.png")}
				style={styles.logo}
				resizeMode="contain"
			/>
		</Pressable>
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
