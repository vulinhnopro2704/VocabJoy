import { Stack } from "expo-router";
import { string } from "yup";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
		</>
	);
}
