import React, { useState,useEffect} from "react"
import { View ,Text, SafeAreaView, ScrollView,StyleSheet, TextInput,Image, TouchableOpacity} from "react-native"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Word} from "@/components/form/word-form";
import {useWordQuery } from "@/lib/features/api/api-search_word";
import Toast from "react-native-toast-message";
import LoadingIcon from "@/components/loadingicon";
import {translate} from '@vitalets/google-translate-api'
import { useTranslateToVieQuery } from "@/lib/features/api/api-slice";

const Search= ()=>{
    const [vocab,setVocab] = useState<Vocab>({
        name:"chill",
        pronunciation:"",
        type: "",
        image_link:"",
        meaning:"ok",
        description:"",
        audio:""
    })
    const [onSubmit,setOnSubmit] =useState<boolean>(false)
    const [input,setInput] = useState<string>("")
    const [word,setWord] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const {data, error:errorGet, isLoading:isLoadingGet } = useWordQuery(word)
    const {data:meanRes,error:errorMean,isLoading:isLoadingMean} = useTranslateToVieQuery(word)
    useEffect(() => {
        if(word&&vocab.name && !isLoadingGet &&!isLoadingMean)
        {
            getWord();  
        }
        
      }, [data,meanRes]);
    useEffect(()=>{
        setIsLoading(false)
        if(errorGet&&input){
            Toast.show({
                text1: "Tu khong ton tai, Vui lòng kiểm tra lại từ khóa.",
                position: "top",
            });
            setOnSubmit(false)
        }
            return;
    },[errorGet])  
    async function getWord(){
        const wordData = data
        try {
            const dataWord:Vocab = {
                name:wordData[0].word|| "",
                pronunciation:wordData[0].phonetics[1]?.text|| "",
                type:wordData[0].meanings[0]?.partOfSpeech.toUpperCase()|| "",
                audio:wordData[0].phonetics[0]?.audio|| "",
                description:wordData[0].meanings[0]?.definitions[0]?.definition|| "",
                meaning:meanRes.data.mean||"",
                image_link:""
            }
            setOnSubmit(true)
            setVocab(dataWord)
            setIsLoading(false)
            return
        } catch (error) {
            Toast.show({
                text1: "Có lỗi trong khi tìm từ vui lòng thử lại sau",
                position: "top",
            });
        }
    }

  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.header_item}>
                    <TextInput   underlineColorAndroid="transparent"  placeholder="Gõ vào đây từ bạn muốn tìm" style={styles.header_item_input}
                      value={input}
                    onChangeText={(data)=>{
                        setInput(data)
                    }}
                    ></TextInput>
                    <TouchableOpacity onPress={()=>{
                          setWord(input)
                          setIsLoading(true)
                    }}
                    >
                         <FontAwesome6 name="searchengin" size={24} color="#12C2E9" />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:14,color:"white",fontWeight:"600",marginTop:20}}>Từ điển Anh-Việt</Text>
            </View>
            <View style={styles.body}>
                {isLoading && isLoadingMean &&<LoadingIcon></LoadingIcon>}
                {!isLoading &&!onSubmit &&<Image style={styles.body_img} source={require("../../assets/images/search.jpg")}></Image>}
                {!isLoading && onSubmit && <Word vocab={vocab}></Word>}
            </View>
        </SafeAreaView>
    )
} 
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",

    },
    header:{
        flex:2,
        width:"100%",
        backgroundColor:"#063970",
        alignItems:"center",
        justifyContent:"center"
    },
    header_item:{
        width:"80%",
        height:50,
        backgroundColor:"white",
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    header_item_input:{
        width:"75%",
        height:30,
        color:"black",
        fontWeight:"400",
        borderRightWidth:2,
        borderColor:"gray",
        marginRight:20
    },
    body:{
        flex:8,
        alignItems:"center",
        width:"100%"
    },
    body_img:{
     width:"90%",
     height:"75%"
    }
})
export default Search

