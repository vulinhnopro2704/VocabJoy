

import { useEffect, useRef, useState } from "react";
import { StyleSheet, View,Text, Image, Animated, TouchableOpacity, TouchableHighlight, Button, Easing, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Colors } from "../constants/colors"
import { Audio } from "expo-av";
import { Vocab } from "@/data-types/vocabulary";
import { useGet10VocabularyQuery } from "@/lib/features/api/api-slice";
import Study from "@/components/learn-english/flash-card";
import SoundFillWord from "@/components/learn-english/fill-Word";
import OTPFillWord from "@/components/learn-english/fill-WordOTP";
import FlashCard from "@/components/learn-english/flash-card";
import LoadingIcon from "@/components/loadingicon";
import Toast from "react-native-toast-message";
import { playSound, playLocalSound } from "@/utils/play-sound";
import AnswerBar from "@/components/answer_bar";
import { router } from "expo-router";




export default function StudyNewWord(){
    const {data:res,error,isLoading} = useGet10VocabularyQuery("")

    const yellowWidth = useRef(new Animated.Value(20)).current;
    const [isCorrect,setIsCorrect] = useState(true)
    const [index,setIndex] = useState(0)
    const [screenLearn,setScreenLearn] = useState(1)
    const [sound, setSound] = useState<Audio.Sound>();
    const [widthRoad,setWidthRoad] = useState(0)
    const [text,setText] = useState("")
    const [showBox,setShowBox] = useState(false)
    const slideAnim = useRef(new Animated.Value(300)).current;

    const correctSoundEffect = useRef<Audio.Sound | null>(null);
   
    async function handlerSubmitAnswerBar()
    {
     
        if(screenLearn==3)
        {
            if(index==9)
                {
                   return router.back()
                }
            await setIndex(index+1)
            const x = widthRoad *(index+1) +20
       
            Animated.timing(yellowWidth, {
                toValue: x,
                duration: 500,
                useNativeDriver: false,
                easing:Easing.in(Easing.ease)
              }).start()
            setScreenLearn(1)
        }
        else setScreenLearn(screenLearn+1)
        await handleChooseCorrectAnswer()
        hideAnwser()
  
    }
    
    function handlerSubmit(){
        Keyboard.dismiss();
       
        if(screenLearn==1){
            setScreenLearn(screenLearn+1)
            return
        }
        else if(res.data[index].name==text.trim())
        {
            setIsCorrect(true)
        }
        else if(res.data[index].name!=text.trim())
        {
            setIsCorrect(false)
        }
        showAnswer()
    }
    const handleChooseCorrectAnswer = async () => {
		const audioFile = require("@/assets/sound-effect/correct-156911.mp3");
		const sound = await playLocalSound(audioFile);
		correctSoundEffect.current = sound;
		setSound(sound);
		await sound.playAsync();
	};
    

    function setTextParent(childText:string)
    {
        setText(childText)
    }
    

    function selectScreen(){
        switch (screenLearn) {
            case 1:
                return <FlashCard vocab={res.data[index]}></FlashCard>
            case 2:
                return <SoundFillWord setTextParent={setTextParent} vocab={res.data[index]}></SoundFillWord >
            case 3:
                return <OTPFillWord setTextParent={setTextParent} vocab={res.data[index]}></OTPFillWord>
        }
    }

    function nextWord()
    {
        setIndex(index+1)
    }

    const showAnswer = () => {
        setShowBox(true)
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};
    const hideAnwser = ()=>{
        setTimeout(()=> setShowBox(false),300)
		Animated.timing(slideAnim, {
			toValue: 300,
			duration: 300,
			useNativeDriver: true,
		}).start();
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
              <View style={styles.header}>
                <Text style={styles.header_iconX}>X</Text>
                <View style={styles.header_road}>
                    <View style={styles.header_userRoad}
                     onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setWidthRoad(width/10)
                        console.log(width)
                      }}
                    >
                        <Animated.View style={[styles.header_yellowRoad,{width:yellowWidth}]}>
                            <View style={styles.cricle}>
                                <Image 	
                                style={styles.iconBare}
                                source={require("@/assets/images/bare.png")}
                                resizeMode="cover"
                                ></Image>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
            {
               isLoading?<LoadingIcon></LoadingIcon>:selectScreen()
            } 
            </View>
            
            <KeyboardAvoidingView 
            style={{flex:1,justifyContent:"flex-end",marginBottom:60}}          
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
             >
            <View style={styles.button}>
                <TouchableOpacity
                onPress={handlerSubmit}
                >
                    <View style={styles.button_save}>   
                        <Text style={{fontSize:14,color:"white",fontWeight:"600"}}>{ (screenLearn==1)?"Tiếp tục":"Kiểm Tra"}</Text>
                    </View>
                </TouchableOpacity>
         
                {
                (screenLearn==1)&&
                <TouchableOpacity onPress={nextWord}>
                     <Text style={{color:"grey",textDecorationLine:"underline",fontWeight:600}}>Mình đã biết từ này</Text>
                </TouchableOpacity>
                }
            </View>
            </KeyboardAvoidingView>
            
            {showBox&&
            <Animated.View
					style={[
						styles.answerBox,
						{ transform: [{ translateY: slideAnim }] },
					]}
				>
					<AnswerBar
						answer={res.data[index]}
						onPress={handlerSubmitAnswerBar}
						isCorrect={isCorrect}
					/>
				</Animated.View>}       
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:25,
        backgroundColor:"white",
        marginTop:"10%"
    },
    cricle:{
        width:40,
        height:40,
        borderWidth:2,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderColor:Colors.gray_500_shadow,
    
      
    },
    header_iconX:{
        fontSize:25,
        fontWeight:"600",
        color:"grey"
    },
    iconBare:{
        width:30,
        height:30,
    },
   
    button:{
        backgroundColor:"white",
        alignItems:"center",
        gap:20
    },
    header_road:{
        width:"80%",
        height:60,
        justifyContent:"center",
    },
    header_userRoad:{
        width:"90%",
        height:25,
        borderRadius:20,
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:Colors.gray_500
        
      
    },
    header_yellowRoad:{
        backgroundColor:"#FF9900",
        height:25,
        borderRadius:20,
        alignItems:"flex-end",
        justifyContent:"center",
        borderTopWidth:1,
        borderBottomWidth:1,
        
        
    },  
    body:{
        flex:4
    },
    button_save:{
        width:250,
        height:50,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:2,
        backgroundColor:Colors.blue_shadow,
        borderRadius:20,
        shadowColor: Colors.blue_shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4, 
    },
    answerBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
})


