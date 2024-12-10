import Button from "@/components/button";
import LoadingIcon from "@/components/loadingicon";
import { Colors } from "@/constants/colors";
import { useSendOtpMutation } from "@/lib/features/api/api-slice";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Image, StyleSheet, TextInput, View,Text } from "react-native";
import Toast from "react-native-toast-message";


const ForgotPassword = ()=>{
    const [sendOTP,{isLoading,error}] = useSendOtpMutation();
    const [email,setEmail] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const onPressNext=async ()=>{
        try {
            const result = await sendOTP(email.trim()).unwrap()
            if(result.statusCode ==200)
            {
                router.push(`/fill-otp-screen?email=${encodeURIComponent(email)}`);
                Toast.show({
                    text1: "Email hợp lệ",
                    position: "top",
                });
            }
        } catch (error:any) {
            Toast.show({
                text1: error.data.message,
                position: "top",
            });
        }
    }
    function validateEmail(email:string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Image style={styles.logo} resizeMode="contain" source={require("@/assets/images/logo-with-name.png")}></Image>
                {
                    isLoading ? <View style={{marginBottom:300}}><LoadingIcon></LoadingIcon></View>
                :
                <View style={styles.main}>
                    <Text style={{fontSize:16,fontWeight:500,marginBottom:10}}>Nhập email của bạn</Text>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder="Email của bạn" 
                    placeholderTextColor={"grey"}
                    value={email}
                    onChangeText={(value)=>{
                        setEmail(value)
                    }}
                    >
                    </TextInput>
                    <View style={{width:300,height:30}}></View>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>{
                        if(validateEmail(email))
                        {
                            onPressNext()
                        }
                        else
                        Toast.show({
                            text1: "Email không đúng định dạng",
                            position: "top",
                        });
                        }}>
                            <Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Tiếp Theo</Text>
                    </TouchableOpacity>
                  
                </View>
}
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    rectangle:{
        width:"90%",
        height:"70%",
        backgroundColor:"white",
        borderRadius:20,
        marginBottom:100,
        alignItems:"center",

    },
    logo:{
        marginTop:20,
        height:150
    },
    main:{
        marginTop:50,
        alignItems:"center",
        
    },
    textInput:{
        width:300,
        height:60,
        borderWidth:2,
        borderColor:Colors.gray_500_shadow,
        borderRadius:10,
        paddingLeft:10,
        fontSize:16
    },
    button:{
        marginTop:10,
        marginLeft:200,
        width:120,
        height:50,
        borderRadius:20,
        backgroundColor:"#007aff",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"grey",
        borderWidth:1,
        borderBottomWidth:3
    }
})
export default ForgotPassword