import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/colors";

type Lesson = {
    image?: string;
    title: string;
    description: string;
    hasOpenBefore?: boolean;
};

export default function LessonCard({
                                       image,
                                       description,
                                       title,
                                       hasOpenBefore = false,
                                   }: Lesson) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[
                hasOpenBefore ? styles.hasOpenBefore : styles.noOpenBefore,
                styles.container,
                isPressed && styles.pressed,
            ]}
        >
            <Image
                source={require("../assets/images/logo.png")}
                style={styles.image}
            />
            <View style={styles.infor}>
                <Text
                    style={[
                        hasOpenBefore ? { color: "#fff" } : { color: "#000" },
                        styles.title,
                    ]}
                >
                    {title}
                </Text>
                <Text
                    style={[
                        hasOpenBefore ? { color: "#fff" } : { color: "#000" },
                        styles.description,
                    ]}
                >
                    {description}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    hasOpenBefore: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary_shadow,
    },
    noOpenBefore: {
        backgroundColor: Colors.gray_300,
        shadowColor: Colors.gray_300_shadow,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infor: {
        flexDirection: "column",
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
});
