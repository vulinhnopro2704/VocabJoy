import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/tab-bar-icon";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home-screen"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="lesson-screen"
				options={{
					title: "Lesson",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "book" : "book-outline"}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="profile-screen"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "book" : "book-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search-screen"
				options={{
					title: "Search",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "book" : "book-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

//https://www.google.com/search?q=Word+Wrap+when+Web+develop&oq=Word+Wrap+when+Web+develop&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChigATIHCAQQIRiPAtIBCTExNzM1ajBqNKgCALACAA&sourceid=chrome&ie=UTF-8
