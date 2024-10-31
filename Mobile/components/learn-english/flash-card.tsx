import GameForm from "@/components/learn-english/Card/form_game";
import GameText from "@/components/learn-english/Card/form_text";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View,Text, Image, Animated, TouchableOpacity, TouchableHighlight, Button, Easing } from "react-native";
import { Colors } from "../../constants/colors"
import { Audio } from "expo-av";
import { Vocab } from "@/data-types/vocabulary";
<<<<<<< HEAD
import { AUDIO_URL } from "@/constants/backend";
=======
>>>>>>> 99308b2a38ec2757c7fba71e2cdef9b8b383cfa9






const FlashCard:React.FC<{ vocab: Vocab }>=({ vocab })=>{
    const rotateValue = useRef(new Animated.Value(0)).current;
    const [isFlipped, setIsFlipped] = useState(false);
    const [components,SetComponents] = useState(true)
    const rotateInterpolate = rotateValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','180deg']
    })
     //phat am thanh lan dau vao
    const [sound, setSound] = useState<Audio.Sound>();
    const playSound = async(speed:number)=>{
        if(vocab.audio)
        {
        const { sound } = await Audio.Sound.createAsync(
<<<<<<< HEAD
            {uri:AUDIO_URL+vocab.audio},
=======
          { uri:vocab.audio},
>>>>>>> 99308b2a38ec2757c7fba71e2cdef9b8b383cfa9
        );
        setSound(sound)
        await sound.setRateAsync(speed, true);
        await sound.playAsync();
        }
    }
    useEffect(()=>{playSound(1)},[vocab.audio])

    function rotate()

    {
        setIsFlipped(!isFlipped)
        Animated.timing(rotateValue,{
            toValue:isFlipped?0:1,
            duration:1000,
            useNativeDriver:true,
        }).start(({ finished }) => {
            rotateValue.addListener(({ value }) => {

              if (value>0.5 )  SetComponents(false)
              else if(value<0.5) SetComponents(true)

            return
            })
        })
    }

    const rotateStyle = {
        transform: [{ rotateY: rotateInterpolate }],
      };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flex:6}}
            onPress={rotate}>
                <Animated.View style={[styles.body,rotateStyle]} >

                        {components?<GameForm vocab={vocab}></GameForm>:<GameText vocab={vocab}></GameText>}

                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}



const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    header:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:25
    },
    cricle:{
        width:30,
        height:30,
        borderWidth:2,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
      
    },
    header_iconX:{
        fontSize:25,
        fontWeight:"600",
        color:"grey"
    },
    iconBare:{
        width:20,
        height:20,
    },
   
    button:{
        flex:1.5,
        alignItems:"center",
        gap:20
    },
    header_road:{
        width:"80%",
        height:40,
        justifyContent:"center",
    },
    header_userRoad:{
        width:"90%",
        height:20,
        borderWidth:1,
        borderRadius:20,
        alignItems:"center",
        flexDirection:"row"
      
    },
    header_yellowRoad:{
        backgroundColor:"#FF9900",
        height:20,
        borderRadius:20,
        alignItems:"flex-end",
        justifyContent:"center",
        borderTopWidth:1,
        borderBottomWidth:1
    },  
    body:{
        flex:6,

        alignItems:"center"
    },
    form:{
        marginTop:30
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
})

export default FlashCard;