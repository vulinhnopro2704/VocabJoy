import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
} from "react-native";
import React from "react";
import LessonCard from "@/components/lesson-card";
import {
	Lesson,
	useGetAllLessonsQuery,
} from "@/lib/features/api/api-lesson-slice";

export default function LessonScreen() {
	const { data: response, error, isLoading } = useGetAllLessonsQuery();
	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
	if (error) {
		return <Text>Error: {error + ""}</Text>;
	}
	return (
		<FlatList
			data={response?.data}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item, index }) => (
				<LessonCard
					title={item.name}
					description={item.name}
					image={item.image}
					key={index}
					hasOpenBefore={false}
					index={index}
				/>
			)}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			contentContainerStyle={styles.container}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexGrow: 1,
	},
	separator: {
		height: 10,
	},
});
