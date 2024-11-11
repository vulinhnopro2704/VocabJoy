import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React from "react";
import ObjectiveTest from "@/components/objective-test/objective-test";
import { useGetVocabForPracticeQuery } from "@/lib/features/api/api-user-slice";
import { useAppSelector } from "@/lib/hook";
import { generateQuestions } from "@/utils/generateQuestion";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";

export default function TestScreen() {
	const router = useRouter();

	const {
		data: result,
		isLoading,
		isError,
	} = useGetVocabForPracticeQuery(useAppSelector((state) => state.user._id));

	const handleExit = () => {
		Alert.alert("Xác nhận", "Bạn có chắc chắn muốn thoát không?", [
			{
				text: "Hủy",
				style: "cancel",
			},
			{
				text: "Thoát",
				onPress: () => router.back(),
				style: "destructive",
			},
		]);
	};

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>Error when fetching vocab for user</Text>;
	}

	return (
		<View style={styles.container}>
			{/* Top Bar */}
			<View style={styles.topBar}>
				<Text style={styles.title}>Ôn tập</Text>
				<TouchableOpacity
					onPress={handleExit}
					style={styles.exitButton}
				>
					<X size={24} color="red" />
				</TouchableOpacity>
			</View>

			{/* Objective Test */}
			<ObjectiveTest
				questionList={generateQuestions(
					result?.data.praticeVocab ?? []
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		flex: 1,
		flexGrow: 1,
		backgroundColor: "#fff",
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	title: {
		fontSize: 20,
		fontWeight: "medium",
	},
	exitButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	exitText: {
		color: "red",
		fontSize: 16,
	},
});
