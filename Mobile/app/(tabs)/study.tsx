import GameForm from "@/components/form_game";
import { useRef, useState } from "react";
import { StyleSheet, View,Text, Image, Animated, TouchableOpacity } from "react-native";






export default function Study (){
    
    const yellowWidth = useRef(new Animated.Value(20)).current;
    const[widthRoad,setWidthRoad] = useState(0)
     
    function submit(){
        const x = (widthRoad/10) *10
        Animated.timing(yellowWidth, {
            toValue: x,
            duration: 500,
            useNativeDriver: false,
          }).start();

        
    }
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
            <View style={styles.body}>
                      <GameForm></GameForm>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                onPress={submit}
                >
                    <View style={styles.button_save}>   
                        <Text style={{fontSize:14,color:"white",fontWeight:"600"}}>Save</Text>
                    </View>
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
        alignItems:"center"
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
        width:200,
        height:50,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:2,
        backgroundColor:"#2da23f",
        borderRadius:20,
        shadowColor: '#145a1d', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 1, 
        shadowRadius: 4, 
    },
})