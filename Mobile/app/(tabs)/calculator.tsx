import GridCalculatorButton from "@/components/calculator/grid-calculator-button";
import React, { useState } from "react";
import { create, all } from "mathjs";
import {
	SafeAreaView,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { History } from "lucide-react-native";

const math = create(all);

export type ButtonType = {
	content: string;
	onPress: () => void;
	type: "functionButton" | "numberButton" | "operatorButton";
};

export default function Calculator() {
	const [input, setInput] = useState("");
	const [result, setResult] = useState("");

	const [showHistory, setShowHistory] = useState(false);
	const [history, setHistory] = useState<string[]>([]);

	const color = useColorScheme();

	const handleOnNumberAndOperatorPress = (content: string) => () => {
		setInput(input + content);
	};

	const calculate = () => {
		try {
			// Evaluate the expression using mathjs
			console.log(input);
			const evaluatedResult = math.evaluate(input);
			const formattedResult = parseFloat(evaluatedResult.toFixed(4));
			setResult(formattedResult.toString());
			setHistory([...history, `${input} = ${formattedResult}`]);
		} catch (error) {
			setResult("Error");
		}
	};

	const buttonList: ButtonType[] = [
		{
			content: "C",
			onPress: () => {
				setInput("");
				setResult("");
			},
			type: "functionButton",
		},
		{
			content: "+/-",
			onPress: () => {
				setInput((parseFloat(input) * -1).toString());
			},
			type: "functionButton",
		},
		{
			content: "%",
			onPress: () => {
				setInput((parseFloat(input) / 100).toString());
			},
			type: "functionButton",
		},
		{
			content: "/",
			onPress: handleOnNumberAndOperatorPress("/"),
			type: "operatorButton",
		},
		{
			content: "7",
			onPress: handleOnNumberAndOperatorPress("7"),
			type: "numberButton",
		},
		{
			content: "8",
			onPress: handleOnNumberAndOperatorPress("8"),
			type: "numberButton",
		},
		{
			content: "9",
			onPress: handleOnNumberAndOperatorPress("9"),
			type: "numberButton",
		},
		{
			content: "x",
			onPress: handleOnNumberAndOperatorPress("*"),
			type: "operatorButton",
		},
		{
			content: "4",
			onPress: handleOnNumberAndOperatorPress("4"),
			type: "numberButton",
		},
		{
			content: "5",
			onPress: handleOnNumberAndOperatorPress("5"),
			type: "numberButton",
		},
		{
			content: "6",
			onPress: handleOnNumberAndOperatorPress("6"),
			type: "numberButton",
		},
		{
			content: "-",
			onPress: handleOnNumberAndOperatorPress("-"),
			type: "operatorButton",
		},
		{
			content: "1",
			onPress: handleOnNumberAndOperatorPress("1"),
			type: "numberButton",
		},
		{
			content: "2",
			onPress: handleOnNumberAndOperatorPress("2"),
			type: "numberButton",
		},
		{
			content: "3",
			onPress: handleOnNumberAndOperatorPress("3"),
			type: "numberButton",
		},
		{
			content: "+",
			onPress: handleOnNumberAndOperatorPress("+"),
			type: "operatorButton",
		},
		{
			content: ".",
			onPress: handleOnNumberAndOperatorPress("."),
			type: "numberButton",
		},
		{
			content: "0",
			onPress: handleOnNumberAndOperatorPress("0"),
			type: "numberButton",
		},
		{
			content: "Del",
			onPress: () => {
				setInput(input.slice(0, -1));
			},
			type: "functionButton",
		},
		{
			content: "=",
			onPress: calculate,
			type: "operatorButton",
		},
	];

	return (
		<SafeAreaView
			className={
				"w-screen h-screen flex-col gap-4" +
				(color == "dark" ? "bg-black" : "bg-white")
			}
		>
			{showHistory ? (
				<View className="p-14">
					<Text className="text-4xl color-slate-600 text-center">
						History
					</Text>
					<Text className="text-lg color-slate-600">
						{history.join("\n")}
					</Text>
				</View>
			) : (
				<View className="h-screen pb-16 pt-14 items-end justify-end">
					<View className="h-5 flex-grow">
						<Text className="text-4xl color-slate-600">
							{input}
						</Text>
					</View>
					<View className="h-5 flex-grow">
						<Text className="text-5xl color-black">{result}</Text>
					</View>
					<GridCalculatorButton
						className="flex-grow self-end"
						buttonList={buttonList}
					/>
				</View>
			)}
			<TouchableOpacity className="absolute z-20 right-2 top-5">
				<History onPress={() => setShowHistory(!showHistory)} />
			</TouchableOpacity>
		</SafeAreaView>
	);
}
