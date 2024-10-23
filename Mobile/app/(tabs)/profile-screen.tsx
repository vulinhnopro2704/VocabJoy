import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { logoutUser } from "@/lib/features/auth/auth-slice";
import { RootState } from "@/lib/store";
import { Colors } from "@/constants/colors";

const ProfileScreen = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { token } = useAppSelector((state) => state.auth);
	const user = useAppSelector((state: RootState) => state.user);

	useEffect(() => {
		if (!token) {
			router.replace("/");
		}
	}, [token]);

	const handleLogout = async () => {
		// Clear user token and navigate to login screen
		dispatch(logoutUser());
	};

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.noDataText}>No user data available</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.profileSection}>
				<Text style={styles.label}>Name:</Text>
				<Text style={styles.value}>{user.name}</Text>
			</View>

			<View style={styles.profileSection}>
				<Text style={styles.label}>Email:</Text>
				<Text style={styles.value}>{user.email}</Text>
			</View>

			<View style={styles.profileSection}>
				<Text style={styles.label}>Phone:</Text>
				<Text style={styles.value}>{user.phone}</Text>
			</View>

			<View style={styles.profileSection}>
				<Text style={styles.label}>Date:</Text>
				<Text style={styles.value}>
					{new Date(user.date).toLocaleDateString()}
				</Text>
			</View>

			<Pressable style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Logout</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: "#f8f9fa",
	},
	profileSection: {
		marginBottom: 20,
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 2,
	},
	label: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#333",
		marginBottom: 5,
	},
	value: {
		fontSize: 16,
		color: "#555",
	},
	noDataText: {
		fontSize: 18,
		color: "#999",
		textAlign: "center",
		marginTop: 20,
	},
	button: {
		marginTop: 30,
		backgroundColor: Colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 25,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default ProfileScreen;
