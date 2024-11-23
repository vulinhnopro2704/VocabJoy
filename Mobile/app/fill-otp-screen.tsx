import Button from "@/components/button";
import { Colors } from "@/constants/colors";
import { useConfirmOtpMutation, useSendOtpMutation } from "@/lib/features/api/api-slice";
import { RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Image, StyleSheet, TextInput, View,Text } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
type FillOTPParams = {
    email: string; 
  };
  type Props = {
    route: RouteProp<{ FillOTP: FillOTPParams }, 'FillOTP'>;
  };
const FillOTP: React.FC<Props> = ({ route })=>{
    const email = useSearchParams().get("email")||""
    console.log(email)
    const [confirmOTP,{isLoading,error}] = useConfirmOtpMutation()
    const [otp,setOTP] =useState<string>("")
    async function onPressButton(){
        try {
            if(!otp)
            Toast.show({
                text1: "Vui Long Nhap OTP.",
                position: "top",
            });
            else 
            {
                const data = {
                    otp,
                    email
                }
                const result = await confirmOTP(data).unwrap()
                if(result.statusCode == 200)
                {
                    router.push(`/new-password-screen?email=${encodeURIComponent(email)}`);
                    Toast.show({
                        text1: "Xác nhận OTP thành công",
                        position: "top",
                    });
                }
            }
        } catch (error) {
            Toast.show({
                text1: "OTP Không hợp lệ",
                position: "top",
            });
        }
      
    }
    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Image style={styles.logo} resizeMode="contain" source={require("@/assets/images/logo-with-name.png")}></Image>
                <View style={styles.main}>
                <Text style={{marginBottom:20,fontSize:16,fontWeight:"400"}}>Nhập mã OTP đã được gửi về email của bạn</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{width:300}}>
                         <OtpInput numberOfDigits={6} focusColor="green" onBlur={()=>{Keyboard.dismiss()}} onTextChange={(text) => setOTP(text) } />
                    </View>
                </TouchableWithoutFeedback>
                    <TouchableOpacity
                    onPress={()=>{
                        onPressButton()
                    }}
                    style={styles.button}>
            
                            <Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Xác Nhận</Text>
                    </TouchableOpacity>
                  
                </View>
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
        marginTop:20,
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
export default FillOTP