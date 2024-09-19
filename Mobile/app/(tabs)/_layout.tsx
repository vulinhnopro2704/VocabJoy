import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="posts"
				options={{
					title: "Posts",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name="list" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
//https://www.google.com/search?q=Word+Wrap+when+Web+develop&oq=Word+Wrap+when+Web+develop&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChigATIHCAQQIRiPAtIBCTExNzM1ajBqNKgCALACAA&sourceid=chrome&ie=UTF-8
