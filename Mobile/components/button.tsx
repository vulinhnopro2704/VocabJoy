import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
	content: string;
	onPress: () => void;
	buttonClassName?: string;
	textClassName?: string;
	styleText?: any;
	styleButton?: any;
};

const Button = ({
	content,
	onPress,
	styleText,
	styleButton,
	buttonClassName,
	textClassName,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			style={[styles.button, styleButton]}
			className={"flex-grow" + buttonClassName}
			onPress={onPress}
		>
			<Text
				style={[styles.text, styleText]}
				className={textClassName + "text-center"}
			>
				{content}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {},
	text: {
		fontSize: 24,
	},
});

export default Button;
