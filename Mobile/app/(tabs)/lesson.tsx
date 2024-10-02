import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import LessonCard from "@/components/lesson-card";

const lessons = [
    {
        title: "Lesson 1",
        description: "Introduction to React Native",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 2",
        description: "Understanding Components",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 3",
        description: "State and Props",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 4",
        description: "Styling in React Native",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 5",
        description: "Handling User Input",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 6",
        description: "Navigation in React Native",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 7",
        description: "Networking and API Calls",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 8",
        description: "Using Redux for State Management",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 9",
        description: "Animations in React Native",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 10",
        description: "Testing React Native Apps",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 11",
        description: "Deploying React Native Apps",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 12",
        description: "Performance Optimization",
        hasOpenBefore: false,
    },
    {
        title: "Lesson 13",
        description: "Using Native Modules",
        hasOpenBefore: true,
    },
    {
        title: "Lesson 14",
        description: "Accessibility in React Native",
        hasOpenBefore: false,
    },
];

export default function LessonScreen() {
    return (
        <FlatList
            data={lessons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <LessonCard
                    title={item.title}
                    description={item.description}
                    hasOpenBefore={item.hasOpenBefore}
                />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    separator: {
        height: 10,
    },
});
