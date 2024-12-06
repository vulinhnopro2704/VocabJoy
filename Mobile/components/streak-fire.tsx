import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/hook";
import { useGetCurrentStreakQuery } from "@/lib/features/api/api-user-slice";

export default function StreakFire() {
	const userId = useAppSelector((state) => state.auth.userId);
	const { data, refetch } = useGetCurrentStreakQuery(userId!);

	useEffect(() => {
		refetch();
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={require("@/assets/images/streak-fire.png")}
				style={[
					styles.image,
					data?.data.streak == 0 ? { tintColor: "gray" } : {},
				]}
				resizeMode="contain"
			/>
			<Text style={styles.text}>{data?.data.streak}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 5,
	},
	image: {
		height: 30,
		width: 30,
	},
	text: {
		color: "#FC9504",
		fontWeight: "medium",
		fontSize: 18,
	},
});
