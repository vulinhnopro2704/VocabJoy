import { View, Text, StyleSheet, Pressable, TouchableOpacity,Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Vocab } from "@/data-types/vocabulary";
import { Volume2 } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { playLocalSound, playSound } from "@/utils/play-sound";
import { Audio, ResizeMode } from "expo-av";
import { router } from "expo-router";

type Props = {
	onPress: () => void;
};

export default function OutBar({ onPress }: Props) {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const correctSoundEffect = useRef<Audio.Sound | null>(null);
	const playSound = async(speed:number)=>{
		const audioFile =require("@/assets/sound-effect/correct-156911.mp3")
		const sound = await playLocalSound(audioFile);
		correctSoundEffect.current = sound;
		setSound(sound);
		await sound.playAsync();
    }
	useEffect(()=>{
		playSound(1)
	},[])
	return (
		<View
			style={[styles.container,{ backgroundColor: "white" }]}
		>
			<View style={styles.container_logo}>
				<Image style={styles.logo} source={require("@/assets/images/logo.png")}></Image>
			</View>
			<Text style={{width:"80%",textAlign:"center",fontWeight:600,fontSize:18,marginTop:20}}>Làm nốt bài đi. Thoát ngay bay giờ toàn bộ kết quả sẽ không được lưu lại đó.</Text>
			<TouchableOpacity style={styles.button_green} onPress={onPress}>
				<Text style={{fontWeight:600,fontSize:18,color:"white"}}>
					Ở lại học tiếp
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button_white} onPress={()=>router.back()}>
				<Text style={{fontWeight:600,fontSize:18}}>
					Thoát
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		width: "100%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -20,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 10,
		flexDirection: "column",
		flex: 1,
		gap:10,
		paddingTop:50,
        alignItems:"center"
	},
	logo:{
		width:150,
		height:150,
	},
	container_logo:{
		position:"absolute",
		top:-100
	},
	button_green:{
		width:"80%",
		height:50,
		backgroundColor:Colors.green,
		justifyContent:"center",
		alignItems:"center",
		color:"white",
		borderRadius:25,
		borderWidth:1,
		borderColor:"#009900",
		borderBottomWidth:4,
		marginTop:60,
	}
	,button_white:{
		width:"80%",
		height:50,
		backgroundColor:"white",
		justifyContent:"center",
		alignItems:"center",
		borderRadius:25,
		borderWidth:1,
		borderColor:Colors.gray_500,
		borderBottomWidth:4,
		marginTop:10,
		marginBottom:30,
	
	}
});
