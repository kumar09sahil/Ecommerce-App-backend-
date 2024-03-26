const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = asyncHandler( async(data, req,res ) =>{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "odinsonthor546@gmail.com",
        pass: "skonsusttgwylgbn"
      }
    });

      const info = await transporter.sendMail({
        from: '"kumar 👻" <kumar@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
})

module.exports = sendEmail