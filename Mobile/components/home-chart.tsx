import { SafeAreaView, View } from "react-native";
import { BarChart } from "./bar-chart";
import { StyleSheet } from "react-native";

const HomeChart = () => {
	const data = [20, 45, 28, 80, 99];
	const labels = ["1", "2", "3", "4", "5"];
	const chartHeight = 200;

	return (
		<SafeAreaView style={styles.container}>
			<BarChart data={data} labels={labels} height={chartHeight} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		padding: 16,
		width: "100%",
		paddingHorizontal: 60,
	},
});

export default HomeChart;
