import { Colors } from "@/constants/colors";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

type BarChartProps = {
	data: number[];
	labels: string[];
	height: number;
};

export const BarChart = ({ data, labels, height }: BarChartProps) => {
	const maxValue = Math.max(...data);

	return (
		<SafeAreaView style={[styles.chartContainer, { height }]}>
			{data.map((value, index) => (
				<View key={index} style={styles.barContainer}>
					<Text style={styles.valueLabel}>{value}</Text>
					<View
						style={[
							styles.bar,
							{
								height: (value / maxValue) * height,
							},
						]}
					/>
					<Text style={styles.label}>{labels[index]}</Text>
				</View>
			))}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	chartContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 10,
		borderBottomColor: Colors.gray_400,
		borderBottomWidth: 2,
	},
	barContainer: {
		flex: 1,
		alignItems: "center",
	},
	bar: {
		backgroundColor: Colors.primary,
		width: 50,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	valueLabel: {
		marginBottom: 5,
		color: Colors.primary_text,
	},
	label: {
		marginTop: 5,
		color: Colors.primary_text,
	},
});
