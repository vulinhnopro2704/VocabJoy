import { Audio } from "expo-av";
import { useState } from "react";
import { Image, StyleSheet, View ,Text, TouchableOpacity} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/colors";


export default function GameForm(){
    const [sound, setSound] = useState<Audio.Sound>();
    const playSound = async(speed:number)=>{
        const { sound } = await Audio.Sound.createAsync(
          { uri:"https://api.dictionaryapi.dev/media/pronunciations/en/run-au.mp3"},
        );
        setSound(sound)
        await sound.setRateAsync(speed, true);
        await sound.playAsync();
      }
    function descriptioninText(data:string){
        const textArray:string[] = data.split(" ")
        return textArray.map((data)=>{
            if(data=="a")
            {
                console.log("adu")
                return <Text style={styles.wordCore}>ahii </Text>
            }return data+" "
        })
        
    }
    return (
    <View style={styles.container}>
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
        <Image style={styles.image_main} source={require("@/assets/images/gai.jpeg")}></Image>
        <View style={styles.text}>
            <Text style={{fontSize:18,fontWeight:600,textAlign:"center"}}>{descriptioninText("ok bro a do ngoc")}</Text>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        position:"relative",
        width:"80%",
        borderRadius:20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 4, 
        backgroundColor:"white",
        marginTop:30
    
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
    image_main:{
        marginTop:50,
        width:"90%",
        height:250
    },
    text:{
        marginTop:20,
        width:"85%",
        alignItems:"center",
        marginBottom:20
    },
    wordCore:{
        color:Colors.blue,
        textDecorationLine:"underline"
    }

})