import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

type ProfileData = {
	name: string;
	email: string;
	phone: string;
	date: Date;
	vocabulary: { vocab: string; count: number }[];
};

const ProfileScreen = () => {
	const [userData, setUserData] = useState<ProfileData>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate an API call with a timeout
		setTimeout(() => {
			const mockData = {
				name: "Johny",
				email: "Johny123@gmail.com",
				phone: "0979533045",
				date: new Date(),
				vocabulary: [
					{ vocab: "1234567890abcdef12345678", count: 10 },
					{ vocab: "abcdef1234567890abcdef12", count: 5 },
				],
			};
			setUserData(mockData);
			setLoading(false);
		}, 1000); // Simulate a 1-second delay
	}, []);

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (!userData) {
		return (
			<View style={styles.container}>
				<Text>No user data available</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Name:</Text>
			<Text style={styles.value}>{userData.name}</Text>

			<Text style={styles.label}>Email:</Text>
			<Text style={styles.value}>{userData.email}</Text>

			<Text style={styles.label}>Phone:</Text>
			<Text style={styles.value}>{userData.phone}</Text>

			<Text style={styles.label}>Date:</Text>
			<Text style={styles.value}>
				{new Date(userData.date).toLocaleDateString()}
			</Text>

			<Text style={styles.label}>Vocabulary:</Text>
			{userData.vocabulary.map((vocabItem, index) => (
				<View key={index} style={styles.vocabItem}>
					<Text style={styles.value}>
						Vocab ID: {vocabItem.vocab}
					</Text>
					<Text style={styles.value}>Count: {vocabItem.count}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	label: {
		fontWeight: "bold",
		marginTop: 10,
	},
	value: {
		marginBottom: 10,
	},
	vocabItem: {
		marginBottom: 10,
	},
});

export default ProfileScreen;
