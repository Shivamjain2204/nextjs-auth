import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';


export const sendEmail = async ({email, emailType, userId}:any) => {
    
    try {
        //configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "dd8889a1170c9e", // XX
                pass: "7fd9e37e548fcc" // XX
            }
          });

        const mailOptions = {
            from: 'shivam@gmail.com',
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/ verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/ verifyemail?token=${hashedToken} </p>`, 
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (error) {
        
    }
}