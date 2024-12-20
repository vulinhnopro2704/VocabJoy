import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import StoreProvider from "./store-provider";
import { Stack } from "expo-router";
import Header from "@/components/header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
				<Stack.Screen 
					name="index" 
					options={{ headerShown: false }} 
				/>
				<Stack.Screen
					name="test-screen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="study-screen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					 options={{
						headerShown: true, // Hiển thị header mặc định
						header: undefined, // Loại bỏ header custom
					  }}
					name="forgot-password-screen"
				
				/>
				<Stack.Screen
				 options={{
					headerShown: true, // Hiển thị header mặc định
					header: undefined, 
				  }}
					name="new-password-screen"
				
				/>
					<Stack.Screen
					 options={{
						headerShown: true, // Hiển thị header mặc định
						header: undefined, 
					  }}
					name="fill-otp-screen"
					
				/>
			</Stack>
			<Toast />
		</StoreProvider>
	);
}
