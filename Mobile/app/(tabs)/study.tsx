import GameForm from "@/components/form/form_game";
import GameText from "@/components/form/form_text";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View,Text, Image, Animated, TouchableOpacity, TouchableHighlight, Button, Easing } from "react-native";
import { Colors } from "../../constants/colors"
import { Audio } from "expo-av";






export default function Study (){
    
    const yellowWidth = useRef(new Animated.Value(20)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;
    const[widthRoad,setWidthRoad] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false);
    const [components,SetComponents] = useState(true)
    const rotateInterpolate = rotateValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','180deg']
    })
    //bambutton
    function submit(){
        const x = (widthRoad/10) *10
        Animated.timing(yellowWidth, {
            toValue: x,
            duration: 500,
            useNativeDriver: false,
            easing:Easing.in(Easing.ease)
          }).start()



        }
        //phat am thanh lan dau vao
    const [sound, setSound] = useState<Audio.Sound>();
    const playSound = async(speed:number)=>{
        console.log("ok")
        const { sound } = await Audio.Sound.createAsync(
          { uri:"https://api.dictionaryapi.dev/media/pronunciations/en/run-au.mp3"},
        );
        setSound(sound)
        await sound.setRateAsync(speed, true);
        await sound.playAsync();
      }
    useEffect(()=>{playSound(1)},[])

    function rotate()

    {
        setIsFlipped(!isFlipped)
        Animated.timing(rotateValue,{
            toValue:isFlipped?0:1,
            duration:1000,
            useNativeDriver:true,
        }).start(({ finished }) => {
            console.log("zo")
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
            <View style={styles.header}>
                <Text style={styles.header_iconX}>X</Text>
                <View style={styles.header_road}>
                    <View style={styles.header_userRoad}
                     onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setWidthRoad(width)
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

            <TouchableOpacity style={{flex:6}}
            onPress={rotate}>
                <Animated.View style={[styles.body,rotateStyle]} >

                        {components?<GameForm></GameForm>:<GameText></GameText>}

                </Animated.View>
            </TouchableOpacity>

            <View style={styles.button}>
                <TouchableOpacity
                onPress={submit}
                >
                    <View style={styles.button_save}>   
                        <Text style={{fontSize:14,color:"white",fontWeight:"600"}}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                     <Text style={{color:"grey",textDecorationLine:"underline",fontWeight:600}}>Mình đã biết từ này</Text>
                </TouchableOpacity>

            </View>
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