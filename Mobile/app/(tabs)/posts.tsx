import { useGetPostsQuery } from "@/lib/features/api/apiSlice";
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const Posts = () => {
	const {
		data: posts,
		error,
		isLoading,
	} = useGetPostsQuery(undefined, {
		skip: false,
	});

	if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
	if (error) return <Text>Error loading posts</Text>;

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<View>
					<Text>{item.title}</Text>
					<Text>{item.body}</Text>
				</View>
			)}
		/>
	);
};

export default Posts;
