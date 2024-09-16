import React from "react";
import { StyleSheet, useColorScheme, TextStyle, ViewStyle } from "react-native";
import Button from "../button";
import { Colors } from "@/constants/Colors";

type CalculatorButtonProps = {
	content: string;
	onPress: () => void;
	styleText?: TextStyle;
	styleButton?: ViewStyle;
	buttonClassName?: string;
	textClassName?: string;
};

const getButtonStyles = (
	colorScheme: string | undefined,
	buttonType: "number" | "function" | "operator"
) => {
	let buttonColor, textColor;
	if (!colorScheme) {
		colorScheme = "light"; // Provide a default color scheme if needed
	}
	switch (buttonType) {
		case "number":
			buttonColor =
				colorScheme === "dark"
					? Colors.light.calculatorNumberButton
					: Colors.light.calculatorNumberButton;
			break;
		case "function":
			buttonColor =
				colorScheme === "dark"
					? Colors.dark.calculatorFunctionButton
					: Colors.light.calculatorFunctionButton;
			break;
		case "operator":
			buttonColor =
				colorScheme === "dark"
					? Colors.dark.calculatorOperatorButton
					: Colors.light.calculatorOperatorButton;
			break;
	}
	textColor = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
	return { buttonColor, textColor };
};

const CalculatorNumberButton = ({
	content,
	onPress,
	styleText,
	styleButton,
}: CalculatorButtonProps) => {
	const colorScheme = useColorScheme() ?? "light";
	const { buttonColor, textColor } = getButtonStyles(colorScheme, "number");

	return (
		<Button
			content={content}
			onPress={onPress}
			styleButton={[
				styles.button,
				{ backgroundColor: buttonColor },
				styleButton,
			]}
			styleText={[styles.text, { color: textColor }, styleText]}
		/>
	);
};

const FunctionButton = ({
	content,
	onPress,
	styleText,
	styleButton,
	buttonClassName,
	textClassName,
}: CalculatorButtonProps) => {
	const colorScheme = useColorScheme() ?? "light";
	const { buttonColor, textColor } = getButtonStyles(colorScheme, "function");

	return (
		<Button
			content={content}
			onPress={onPress}
			styleButton={[
				styles.button,
				{ backgroundColor: buttonColor },
				styleButton,
			]}
			styleText={[styles.text, { color: textColor }, styleText]}
			buttonClassName={buttonClassName}
			textClassName={textClassName}
		/>
	);
};

const OperatorButton = ({
	content,
	onPress,
	styleText,
	styleButton,
	buttonClassName,
	textClassName,
}: CalculatorButtonProps) => {
	const colorScheme = useColorScheme() ?? "light";
	const { buttonColor, textColor } = getButtonStyles(colorScheme, "operator");

	return (
		<Button
			content={content}
			onPress={onPress}
			styleButton={[
				styles.button,
				{ backgroundColor: buttonColor },
				styleButton,
			]}
			styleText={[styles.text, { color: textColor }, styleText]}
			buttonClassName={buttonClassName}
			textClassName={textClassName}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
		borderRadius: 8,
	},
	text: {
		fontSize: 24,
	},
	// Add additional styles as needed for different button types and themes
	functionButton: {
		color: Colors.light.text,
		backgroundColor: Colors.light.calculatorFunctionButton,
	},
	numberButton: {
		color: Colors.light.text,
		backgroundColor: Colors.light.calculatorNumberButton,
	},
	operatorButton: {
		color: Colors.light.text,
		backgroundColor: Colors.light.calculatorOperatorButton,
	},
});

export { CalculatorNumberButton, FunctionButton, OperatorButton };
