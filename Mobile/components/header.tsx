import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";

export default function Header() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<View style={styles.header}>
			<Pressable
				style={styles.backButton}
				onPress={() => navigation.goBack()}
			>
				<ArrowLeft color="#000" size={24} />
			</Pressable>
			<Text style={styles.title}>VocabJoy</Text>
			<Pressable
				onPress={() => navigation.navigate("profile-screen")}
				style={styles.avatar}
			>
				<Image
					style={styles.image}
					source={require("../assets/images/logo.png")}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	backButton: {
		padding: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 30,
		height: 30,
		borderRadius: 15,
	},
});
