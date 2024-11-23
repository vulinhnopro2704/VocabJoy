import { Vocab } from "@/data-types/vocabulary"
import { StyleSheet, View } from "react-native"


const AnswerBox:React.FC<{ vocab: Vocab,result:boolean }>=({ vocab,result })=>{
    return (
        <View style={[styles.container,{backgroundColor:(result?"green":"red")}]}>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        position:"absolute",
        height:"60%",
        width:"100%",
        bottom:"-100%"
      
    },
})

export default AnswerBox