import { userDataBase } from '../models/mail';
import { transportation, getMailOption } from '../constants/sendOtpForm';
import nodemailer from 'nodemailer'

export const sendOtpEmail = async ( userData : userDataBase ) => {
    try {
        const transporter = nodemailer.createTransport( transportation );
        
        try {
            await transporter.sendMail( getMailOption( userData ) );
            return true

        } catch ( error : any ) {
            console.log( error )
            return false
            throw new Error( error );
        }

    } catch ( error : any ) {
        console.log( error )
        throw new Error("Send Email has an Error")
    }

}