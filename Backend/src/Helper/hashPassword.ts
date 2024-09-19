import bcrypt from "bcryptjs"



export const hashPassword = async (password:string)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password,salt)
    } catch (error) {
        throw new Error("fail to hash"+error);
    }
}

export const comparePassword = async (password:string,userPassword:string)=>{
    try {
        return bcrypt.compare(password,userPassword)
    } catch (error) {
        throw new Error("Fail to compare"+error);
        
    }
}