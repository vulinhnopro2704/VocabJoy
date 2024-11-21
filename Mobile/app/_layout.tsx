import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import StoreProvider from "./store-provider";
import { Stack } from "expo-router";
import Header from "@/components/header";

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
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
				initialRouteName="index"
			>
				<Stack.Screen options={{ headerShown: false }} name="index" />
				<Stack.Screen
					name="test-screen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="study-screen"
					options={{ headerShown: false }}
				/>
						<Stack.Screen
					name="forgot-password-screen"
					options={{ headerShown: false }}
				/>
			</Stack>
			<Toast />
		</StoreProvider>
	);
}
