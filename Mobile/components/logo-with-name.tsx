import { View, Image, StyleSheet, SafeAreaView, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function LogoWithName() {
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Image
					source={require("../assets/images/logo.png")}
					style={styles.logo}
				/>
			</View>
			<SafeAreaView
				style={{
					display: "flex",
					gap: 4,
					flexDirection: "row",
					alignItems: "center",
					marginTop: 10,
				}}
			>
				<Text
					style={{
						color: Colors.primary_text,
						fontSize: 32,
					}}
				>
					Vocab
				</Text>
				<Text
					style={{
						padding: 5,
						color: "#fff",
						fontSize: 32,
						backgroundColor: Colors.primary,
						borderRadius: 10,
						overflow: "hidden",
					}}
				>
					JOY
				</Text>
			</SafeAreaView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary,
		borderRadius: 12,
	},
	logo: {
		width: 100,
		height: 100,
	},
});
