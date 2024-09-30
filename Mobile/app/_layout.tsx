import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import StoreProvider from "./store-provider";
import Header from "@/components/header";
import { RootStackParamList } from "../navigation";

function checkIfUserIsLoggedIn() {
	return false;
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkLoginStatus = async () => {
			const loggedIn = checkIfUserIsLoggedIn();
			setIsLoggedIn(loggedIn);
		};

		checkLoginStatus();
	}, []);

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<StoreProvider>
			<Stack
				screenOptions={{
					header: () => <Header />,
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerTintColor: "#ccc",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				{isLoggedIn ? (
					<Stack.Screen
						name="(tabs)/login.tsx"
						options={{ headerShown: false }}
					/>
				) : (
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: true }}
					/>
				)}
				<Stack.Screen name="+not-found" />
				<Stack.Screen name="profile-screen" />
			</Stack>
			<Toast />
		</StoreProvider>
	);
}
