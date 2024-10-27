import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
	question?: string;
	content: string;
	keyword: string;
	variant: "variant1" | "variant2";
};

export default function Question({
	question = "Chọn từ thích hợp điền vào chỗ trống",
	content,
	keyword,
	variant,
}: Props) {
	const renderContent = () => {
		if (variant === "variant1") {
			const parts = content.split(keyword);
			return (
				<Text style={styles.contentText}>
					{parts.map((part, index) => (
						<React.Fragment key={index}>
							{part}
							{index < parts.length - 1 && (
								<Text style={styles.keyword}>{keyword}</Text>
							)}
						</React.Fragment>
					))}
				</Text>
			);
		} else if (variant === "variant2") {
			const blank = "______________";
			const contentWithBlank = content.replace(keyword, blank);
			return <Text style={styles.contentText}>{contentWithBlank}</Text>;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={styles.questionText}>{question}</Text>
			</View>
			<View style={styles.contentContainer}>{renderContent()}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	questionContainer: {
		marginBottom: 10,
	},
	questionText: {
		fontSize: 20,
		fontWeight: "medium",
		color: "#666666",
		textAlign: "center",
	},
	contentContainer: {
		marginTop: 10,
		padding: 20,
		borderRadius: 15,
		borderColor: "#E7E7E7",
		borderWidth: 2,
	},
	contentText: {
		fontSize: 18,
		color: "#555",
		textAlign: "center",
	},
	keyword: {
		color: "blue",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
});
