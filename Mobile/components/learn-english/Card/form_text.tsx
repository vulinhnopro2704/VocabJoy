import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View ,Text, TouchableOpacity, Animated} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/colors";
import { Vocab } from "@/data-types/vocabulary";
import { AUDIO_URL } from "@/constants/backend";




const GameText:React.FC<{ vocab: Vocab }>=({ vocab })=>{
    const [sound, setSound] = useState<Audio.Sound>();
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
    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotateInterpolate = rotateValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','-180deg']
    })
    const rotateStyle = {
        transform: [{ rotateY: rotateInterpolate }],
      };
    useEffect(()=>{
        Animated.timing(rotateValue,{
            toValue:1,
            duration:0,
            useNativeDriver:false,
        }).start()
    })
    return (
    <Animated.View style={[styles.container,rotateStyle]}>
        <View style={styles.button}>
            <TouchableOpacity
            onPress={()=>playSound(1)}>
                  <View style={styles.button_el}><AntDesign  name="sound" size={24} color={Colors.blue} /></View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{playSound(0.5)}}>
               <View style={styles.button_el}><MaterialCommunityIcons name="snail" size={24} color={Colors.blue} /></View>
            </TouchableOpacity>
        </View>
        <View style={styles.text}>
            <Text style={{fontSize:28,fontWeight:600,textAlign:"center"}}>{vocab.name}</Text>
            <Text style={{fontSize:24,fontWeight:200,textAlign:"center"}}>{vocab.pronunciation}</Text>
            <Text style={{fontSize:20,fontWeight:400,textAlign:"center"}}>{vocab.example}</Text>
        </View>
    </Animated.View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        position:"relative",
        width:"80%",
        height:"85%",
        borderRadius:20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 4, 
        backgroundColor:"white",
        marginTop:30,
    
    },
    button:{
        flexDirection:"row",
        position:"absolute",
        gap:20
    },
    button_el:{
        width:50,
        height:50,
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
    
    text:{
        marginTop:100,
        width:"85%",
        alignItems:"center",
        marginBottom:20,
        gap:20
    },
    wordCore:{
        color:Colors.blue,
        textDecorationLine:"underline"
    }

})

export default GameText