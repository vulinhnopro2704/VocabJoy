import Button from "@/components/button";
import LoadingIcon from "@/components/loadingicon";
import { Colors } from "@/constants/colors";
import { useSendOtpMutation } from "@/lib/features/api/api-slice";
import { useUpdatePasswordMutation } from "@/lib/features/api/api-user-slice";
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
const NewPassword: React.FC<Props> = ({route})=>{
    const email= useSearchParams().get("email")||"";
    const [password,setPassword] =useState<string>("")
    const [passwordConfirm,setPasswordConfirm] =useState<string>("")
    const [updatePassword,{isLoading,error}] = useUpdatePasswordMutation()
    const [success,setSucces] = useState<boolean>(false)
    const [count,setCount] = useState<Number>(3)
    async function onPressButton(){
        try {
            if(password.length<6)
             {
                Toast.show({
                     text1: "Mật khẩu phải dài hơn 6 ký tự",
                     position: "top",
                });
                return
            }
            else if(password!=passwordConfirm)
            {
                Toast.show({
                    text1: "Mật khẩu Không khớp",
                    position: "top",
                });
                return
            }
            const data = {
                email,
                password
            }
            console.log(data)
            const result = await updatePassword(data).unwrap()
            if(result.statusCode==200) 
            {
            setSucces(true)
             Toast.show({
                    text1: "bạn sẽ được chuyển về trang đăng nhập",
                    position: "top",
                });
                setTimeout(()=>{
                    router.push({pathname:"/"})
                },3000)
            }
        } catch (error) {
            
        }
       
  
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <Image style={styles.logo} resizeMode="contain" source={require("@/assets/images/logo-with-name.png")}></Image>
                <View style={styles.main}>
                {success? <View style={{marginBottom:300}}><LoadingIcon></LoadingIcon></View>
                :
                <View>
                <View style={{gap:10}}>
                    <TextInput  style={styles.textInput} placeholder="Mật khẩu mới"  placeholderTextColor={"grey"} secureTextEntry
                    value={password}
                    onChangeText={value=>setPassword(value)}
                    onBlur={()=>{
                        if(password.length<6)
                        {
                            Toast.show({
                                text1: "Mật khẩu phải dài hơn 6 ký tự",
                                position: "top",
                            });
                        }
                    }}
                    ></TextInput>
                    <TextInput style={styles.textInput} placeholder="Xác nhận mật khẩu"  placeholderTextColor={"grey"} secureTextEntry
                       value={passwordConfirm}
                       onChangeText={value=>setPasswordConfirm(value)}
                       onBlur={()=>{
                   
                    }}></TextInput>
                </View>
                    <TouchableOpacity
                    onPress={()=>{
                        onPressButton()
                    }}
                    style={styles.button}>
            
                            <Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Xác Nhận</Text>
                    </TouchableOpacity>
                    </View>
}
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
export default NewPassword