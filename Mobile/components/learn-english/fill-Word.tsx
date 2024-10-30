import { Vocab } from "@/data-types/vocabulary";
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import AnswerBar from "../answer_bar";
import AnswerBox from "./Card/answerBox";
import Toast from "react-native-toast-message";
import { AUDIO_URL } from "@/constants/backend";



const SoundFillWord:React.FC<{ vocab: Vocab,setTextParent:any }>=({ vocab,setTextParent })=>{
    const [text,setText] = useState("")
    const [sound, setSound] = useState<Audio.Sound>();
    const [answer,setAnswer] = useState(true)
    const [showAnswer,setShowAnswer] = useState(false)
    const [focus,setOnFocus] =useState(false)
    const playSound = async(speed:number)=>{
        if(vocab.audio)
        {
        const { sound } = await Audio.Sound.createAsync(
            {uri:AUDIO_URL+vocab.audio},
        );
        setSound(sound)
        await sound.setRateAsync(speed, true);
        await sound.playAsync();
      }
    }
    useEffect(()=>{
      playSound(1)
    },[vocab.audio])
    function handlerSubmit(){
        if(text==vocab.name)
        {
           
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.sounds}>
            <TouchableOpacity
            onPress={()=>playSound(1)}>
                  <View style={styles.button_el}><AntDesign  name="sound" size={24} color={Colors.blue} /></View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{playSound(0.5)}}>
               <View style={styles.button_el}><MaterialCommunityIcons name="snail" size={24} color={Colors.blue} /></View>
            </TouchableOpacity>
            </View>
        
            <TextInput
            onFocus={()=>setOnFocus(true)}
            onBlur={()=>setOnFocus(false)}
            value={text}
            onChangeText={text=>{setText(text)
                setTextParent(text)
            }}
            style={[styles.textinput,{borderColor:focus?"green":"Colors.gray_500"}]}
            placeholder="Gõ lại từ bạn nghe được"
            placeholderTextColor={"grey"}
            ></TextInput>
        </View>
    )
}   

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
    },
    sounds:{
        flexDirection:"row",
        marginTop:100,
        gap:30
    },
    button_el:{
        width:70,
        height:70,
        borderRadius:50,
        top:-20,
        backgroundColor:"white",
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        justifyContent:"center",
        alignItems:"center",
    },
    textinput:{
        width:"90%",
        height:60,
        borderRadius:15,
        borderWidth:1,
        padding:10,
        fontWeight:"medium",
        fontSize:20,
        textAlign:"center",
        borderColor:Colors.gray_500,
        color:"grey"
    },
})

export default SoundFillWord