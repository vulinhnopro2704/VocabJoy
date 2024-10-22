import { SafeAreaView, View } from "react-native";
import { BarChart } from "./bar-chart";
import { StyleSheet } from "react-native";
import { Levels } from "@/lib/features/api/api-user-slice";

type HomeChartProps = {
	data?: Levels;
	labels?: string[];
	chartHeight?: number;
};

export default function HomeChart({
	data = { level1: 20, level2: 10, level3: 60, level4: 40, level5: 20 },
	labels = ["1", "2", "3", "4", "5"],
	chartHeight = 200,
}: HomeChartProps) {
	const dataArray: number[] = Object.values(data);
	return (
		<SafeAreaView style={styles.container}>
			<BarChart
				data={dataArray!}
				labels={labels!}
				height={chartHeight!}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		paddingTop: 20,
		borderRadius: 16,
		padding: 16,
		width: "100%",
		paddingHorizontal: 60,
	},
});
