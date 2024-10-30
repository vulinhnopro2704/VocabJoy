import { HttpException } from "../handlers/http_exception-handler";
import vocab from "../interface/vocab"
import Vocab from "../models/vocab"
import {translate} from '@vitalets/google-translate-api'

export const createVocabService = async (newVocab:vocab)=>{
        try {
            const result:vocab = await Vocab.create(newVocab)
            return result
        } catch (error) {
            if(error.name == 'ValidationError')
                throw new HttpException(400, 'Invalid data'+error);
            else if (error.code === 11000) {
                throw new HttpException(409, 'Duplicate data error');
              }
            else
                throw new HttpException(500, 'Database error:' + error);
        }
      
    } 


export const getVocabByNameService = async (wordName:string)=>{
        const result:vocab = await Vocab.findOne({name:wordName.toLowerCase()})
        if(!result)
        {
            throw new HttpException(404,'Cannot find Vocab')
        }
        return result
}

export const translateToVie = async (word:string)=>{
    if(!word)
    {
      throw new HttpException(400,"invalid input")
      return
    }
  
      const result = await translate(word,{
        from:"en",
        to:"vi"
        })
    return result.text

}




