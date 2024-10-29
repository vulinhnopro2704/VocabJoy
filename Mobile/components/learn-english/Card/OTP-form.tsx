import { Colors } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';

const OTPTextInput:React.FC<{ length:number,onChangeText:any}>=({ length,onChangeText })=>{
  const [Word,setWord] = useState(new Array(length).fill(""))
  const [forcus,setOnFocus] = useState(false)
  const inputs = useRef<(TextInput | null)[]>([]);
  const handleChangeText = (text: string, index: number) => {
    const newWord = [...Word];
    if (text.length <= 1) {
      newWord[index] = text
    }
    setWord(newWord);
    onChangeText(newWord.join(""))
    if (text && index < length - 1) {
        inputs.current[index + 1]?.focus();
    }
     if (text == "" && index > 0) {
        inputs.current[index - 1]?.focus(); 
    }
  
  };


  return (
    <View style={[styles.container,{borderColor:forcus?"green":"Colors.gray_500"}]}>
    <View style={{width:10}}></View>
      {Word.map((value, index) => (
        <TextInput
          onFocus={()=>setOnFocus(true)}
          onBlur={()=>setOnFocus(false)}
          key={index}
          style={styles.input}
          maxLength={1} 
          value={value}
          ref={(input) => (inputs.current[index] = input)}
          onChangeText={(text) => handleChangeText(text, index)}
        />
      ))}
    <View style={{width:10}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'center',
    height:65,
    borderWidth:1.5,
    marginTop:30,
    borderRadius:15,

  },
  input: {
    marginLeft:6,
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 22,
    color:"black",
    fontWeight:"bold",
    borderBottomColor:"black",
    borderBottomWidth:2
  },
});

export default OTPTextInput