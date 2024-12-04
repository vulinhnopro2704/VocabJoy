import { Colors } from "@/constants/colors"
import { Vocab} from "@/data-types/vocabulary"
import { useEffect, useState } from "react"
import { TextInput, TouchableOpacity, View,StyleSheet,Text } from "react-native"
import OTPInputView from 'react-native-otp-textinput'
import OTPTextInput from "./Card/OTP-form"



const OTPFillWord:React.FC<{ vocab: Vocab,setTextParent:any }>=({ vocab,setTextParent })=>{

    
    return (
        <View style={styles.container}>
            <Text style={{fontSize:30,fontWeight:"600"}}>
                {vocab.meaning||""}
            </Text>
            <Text style={{fontSize:20,fontWeight:"400",color:Colors.gray_500}}>
                {"( "+vocab.type+" )"||""}
            </Text>
            <OTPTextInput onChangeText={(value:string)=>{setTextParent(value)}} length={vocab.name?vocab.name.length:0}></OTPTextInput>
        </View>
    )
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        marginTop:50,
        gap:10
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

export default OTPFillWord