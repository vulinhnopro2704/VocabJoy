import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";


type Lesson = {
    image?: string;
    title: string;
    description: string;
    hasOpenBefore?: boolean;
    index:number;
    _id:string;
};

export default function LessonCard({    _id,
                                        index,
                                        image,
                                        description,
                                        title,
                                        hasOpenBefore = false,
                                   }: Lesson) {
    const [isPressed, setIsPressed] = useState(false);

    const nameLesson:string[] =["Trường Học","Gia Đình","Vẻ Bề Ngoài","","@/assets/images/school.jpge"]
    const imglinks:any={
        0:require("@/assets/images/school.jpeg"),
        1:require("@/assets/images/family.jpeg"),
        2:require("@/assets/images/appearance.jpeg"),
    }
    return (
        <Pressable
            onPressIn={() => router.push({pathname:"/study-screen",params:{_id}})}

            style={[
                hasOpenBefore ? styles.hasOpenBefore : styles.noOpenBefore,
                styles.container,
                isPressed && styles.pressed,
            ]}
        >
            <Image
                source={imglinks[`${index}`]}
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
                    {""+(index+1)+". "+nameLesson[index]}
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
        borderWidth:1,
        borderColor:"#DDDDDD",
        borderBottomWidth:5,
        backgroundColor:"white"
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
        width: 70,
        height: 70,
        borderRadius: 35,
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
