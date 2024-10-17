import User from "../models/user"
import Vocab from "../models/vocab";
import responseHandle, { badRequest } from "../handlers/response-handler";

export const userController = {
    getAllUser: async (req,res) => {
        try{
            const user = await User.find().select("name email phone vocabulary");
            return responseHandle.success(res, user, "All User");
        }catch(err){
            return responseHandle.badRequest(res, "Failed");
        }
    },

    getDiaryUser: async(req,res) => {
        try{
            const user = await User.findById(req.params.id);
            if(user == null)
            {
                return responseHandle.badRequest(res, "Can't find user");
            }

            var sortedVocab = user.vocabulary.sort((a, b) => a.count - b.count);
            if(user.vocabulary.length > 30)
            {
                const randomLimit = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
                sortedVocab = sortedVocab.slice(0, randomLimit)
            }

            var le1 = 0, le2 = 0, le3 = 0, le4 = 0, le5 = 0;
            for(let i = 0; i < user.vocabulary.length; i++) {
                switch (user.vocabulary[i].count) {
                    case 1:
                        le1++;
                        break;
                    case 2:
                        le2++;
                        break;
                    case 3:
                        le3++;
                        break;
                    case 4:
                        le4++;
                        break;
                    case 5:
                        le5++;
                        break;
                    default:
                        break;
                }
                
            }
            const levels = {
                level1: le1,
                level2: le2,
                level3: le3,
                level4: le4,
                level5: le5,
            };
            
            
            const data = {
                total: user.vocabulary.length,
                levels: levels,
                practice: sortedVocab.length,
            };


            return responseHandle.success(res, data, "User");
        }catch(err)
        {
            return responseHandle.badRequest(res, "Failed");
        }
    },

    addVocabToUserDiary : async(req,res) => {
        try{
            const user = await User.findById(req.params.userId);
            const vocab = await Vocab.findById(req.params.vocabId);
            if(!user) {
                return responseHandle.notFound(res, "Can't find user");
            }
 
            var vocabIndex = -1;
            for(let i = 0; i < user.vocabulary.length; i++) {
                if(user.vocabulary[i].vocab == req.params.vocabId) {
                    vocabIndex = i;
                    break; 
                }
            }
            if(vocabIndex !== -1){
                if(user.vocabulary[vocabIndex].count < 5)
                {
                    user.vocabulary[vocabIndex].count += 1;
                }
                else{
                    return responseHandle.badRequest(res, "Vocab count cannot exceed 5");
                }    
            }else
            {
                user.vocabulary.push({
                    vocab: req.params.vocabId,
                    count : 1
                });
            }
            const saveUser = await user.save();
            return responseHandle.success(res, saveUser, "Add vocab to diary succesfully");
            
        }catch(err)
        {
            console.log(err);
            return responseHandle.badRequest(res, "Failed");
        }
    }    
};


  
