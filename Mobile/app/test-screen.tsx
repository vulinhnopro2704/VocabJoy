import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ObjectiveTest from "@/components/objective-test/objective-test";
import { useGetVocabForPracticeQuery } from "@/lib/features/api/api-user-slice";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/hook";
import { generateQuestions } from "@/utils/generateQuestion";

export default function TestScreen() {
	const {
		data: result,
		isLoading,
		isSuccess,
		isError,
	} = useGetVocabForPracticeQuery(useAppSelector((state) => state.user._id));

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>Error when fetching vocab for user</Text>;
	}

	return (
		<View style={styles.container}>
			<ObjectiveTest
				questionList={generateQuestions(result?.data.praticeVocab!)}
			/>
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
