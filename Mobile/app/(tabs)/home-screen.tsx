import React from "react";
import { Notebook } from "lucide-react-native";
import {
	View,
	Pressable,
	Text,
	StyleSheet,
	SafeAreaView,
	Image,
	ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/colors";
import HomeChart from "@/components/home-chart";
import { useGetUserVocabsHomeQuery } from "@/lib/features/api/api-user-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { router, useRouter } from "expo-router";

export default function HomeScreen() {
	const userId = useSelector((state: RootState) => state.auth.userId);
	const route = useRouter();
	const { data, isLoading, isError, error } = useGetUserVocabsHomeQuery(
		userId!
	);
	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
	if (isError) {
		return <Text>Error: {error + ""}</Text>;
	}
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("@/assets/images/Pattern.png")}
				style={styles.pattern}
				resizeMode="cover"
			/>
			<View style={styles.noteContainer}>
				<View style={styles.note}>
					<Notebook color={"#fff"} />
				</View>
				<Text style={styles.noteText}>
					Sổ tay đã có {data?.data.total} từ
				</Text>
			</View>
			<HomeChart data={data?.data.levels} />
			<View style={styles.centerColumn}>
				<Text style={[{ fontSize: 18 }, styles.centerText]}>
					Chuẩn bị ôn tập: {data?.data.practice} từ
				</Text>
				<Pressable
					onPress={() => {
						router.push("/test-screen");
					}}
					style={styles.button}
				>
					<Text
						style={[
							{ color: "#fff" },
							{ fontSize: 24 },
							styles.centerText,
						]}
					>
						Ôn tập ngay
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		flex: 1,
		gap: 50,
		flexDirection: "column",
		alignItems: "center",
		padding: 20,
	},
	centerColumn: {
		flexDirection: "column",
		maxWidth: 250,
		gap: 15,
		alignItems: "center",
	},
	noteContainer: {
		flexDirection: "row",
		alignItems: "center",
		transform: [{ translateX: -20 }],
	},
	note: {
		padding: 15,
		borderRadius: 50,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: Colors.primary_shadow,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 6,
		transform: [{ translateX: 40 }],
		zIndex: 1,
	},
	noteText: {
		color: "#141718",
		paddingVertical: 14,
		paddingHorizontal: 50,
		textAlign: "center",
		backgroundColor: Colors.gray_400,
		borderRadius: 25,
		fontSize: 18,
		overflow: "hidden",
		fontWeight: "500",
		borderColor: Colors.primary,
		borderWidth: 2,
		shadowColor: Colors.primary_shadow,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 6,
	},
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
		textAlign: "center",
		shadowColor: Colors.primary_shadow,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 6,
	},
	centerText: {
		textAlign: "center",
		fontWeight: "600",
	},
	pattern: {
		position: "absolute",
		top: "50%",
		right: "20%",
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		opacity: 0.1,
	},
});
