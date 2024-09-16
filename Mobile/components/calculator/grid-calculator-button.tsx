import React from "react";
import { StyleSheet, View } from "react-native";
import {
	CalculatorNumberButton,
	FunctionButton,
	OperatorButton,
} from "./calculator-button";
import { ButtonType } from "@/app/(tabs)/calculator";

type GridCalculatorButtonProps = {
	buttonList: ButtonType[];
	className?: string;
};

const GridCalculatorButton = ({
	buttonList,
	className,
}: GridCalculatorButtonProps) => {
	return (
		<View className={className} style={styles.gridContainer}>
			{buttonList.map((button, index) => {
				const ButtonComponent =
					button.type === "functionButton"
						? FunctionButton
						: button.type === "numberButton"
						? CalculatorNumberButton
						: OperatorButton;

				return (
					<View key={index} style={styles.gridItem}>
						<ButtonComponent
							content={button.content}
							onPress={button.onPress}
						/>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	gridContainer: {
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	gridItem: {
		width: "25%",
		padding: 4,
	},
});

export default GridCalculatorButton;
