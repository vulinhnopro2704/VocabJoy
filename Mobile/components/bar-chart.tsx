import { Colors } from "@/constants/colors";
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

type BarChartProps = {
	data: number[];
	labels: string[];
	height: number;
};

export const BarChart = ({ data, labels, height }: BarChartProps) => {
	// Kiểm tra tính hợp lệ của các tham số
	const isValidData =
		Array.isArray(data) &&
		data.every((val) => typeof val === "number" && !isNaN(val));
	const isValidLabels =
		Array.isArray(labels) && labels.length === data.length;
	const isValidHeight =
		typeof height === "number" && height > 0 && !isNaN(height);

	// Nếu bất kỳ tham số nào không hợp lệ, trả về một view rỗng hoặc thông báo lỗi
	if (!isValidData || !isValidLabels || !isValidHeight) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Invalid data provided</Text>
			</View>
		);
	}

	const maxValue = Math.max(...data) || 1; // Đặt giá trị mặc định là 1 để tránh phép chia cho 0
	const fillColors = ["#3498db", "#e74c3c", "#f1c40f", "#2ecc71", "#9b59b6"];
	const screenWidth = Dimensions.get("window").width;
	const ChartHeight = height;

	return (
		<SafeAreaView style={[styles.chartContainer, { height: ChartHeight }]}>
			{data.map((value, index) => (
				<View key={index} style={styles.barContainer}>
					<Text style={styles.valueLabel}>{value} từ</Text>
					<Animatable.View
						animation={{
							from: { height: 0 },
							to: { height: (value / maxValue) * height },
						}}
						duration={500}
						delay={index * 100}
						style={[
							styles.bar,
							{
								backgroundColor:
									fillColors[index % fillColors.length],
								width: screenWidth / (data.length * 2),
							},
						]}
					/>
					<View style={styles.separator} />
					<Text style={styles.label}>{labels[index]}</Text>
				</View>
			))}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	chartContainer: {
		flexDirection: "row",
		flexGrow: 1,
		alignItems: "flex-end",
		borderBottomColor: Colors.gray_400,
		borderBottomWidth: 2,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	barContainer: {
		flex: 1,
		alignItems: "center",
	},
	bar: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	separator: {
		height: 10,
		width: 100,
		backgroundColor: Colors.primary,
		color: Colors.gray_400,
	},
	valueLabel: {
		marginBottom: 5,
		color: Colors.primary_text,
		fontWeight: "bold",
	},
	label: {
		marginTop: 5,
		color: Colors.primary_text,
		fontSize: 20,
		fontWeight: "bold",
	},
	errorContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	errorText: {
		color: "red",
		fontWeight: "bold",
	},
});
