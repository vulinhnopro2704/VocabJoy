import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import React from "react";
import { View, Text, Button } from "react-native";

const Counter = () => {
	const dispatch = useAppDispatch();
	const count = useAppSelector((state) => state.counter.value);

	return (
		<View>
			<Text>Count: {count}</Text>
			<Button title="Increment" onPress={() => dispatch(increment())} />
			<Button title="Decrement" onPress={() => dispatch(decrement())} />
		</View>
	);
};

export default Counter;
