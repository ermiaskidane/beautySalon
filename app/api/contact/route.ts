import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const {firstName, email, message } = body
    
    // send message with resend library 
    // to format the html we can use the react-email component library 
    // both in resend and nodemailer html property

    // const data = await resend.emails.send({
    //   from: 'LeospaBeauty <onboarding@resend.dev>',
    //   to: ["sotyu28@gmail.com"],
    //   subject:
    //     'Thanks for your order! This is your receipt.',
    //   html: `<div>${message}</div><p>Sent from: ${email}</p>`,
    // })

    // send message using nodemailer intergated with resend
    const transport = nodemailer.createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        // user: process.env.EMAIL_USERNAME, // generated ethereal user
        user: "resend",
        pass: process.env.RESEND_API_KEY
      }
    })


    const mailData = {
      from: 'LeospaBeauty <hello@ermiaskidane.online>',
      to: 'sotyu28@gmail.com',
      subject: `Message From ${firstName}`,
      text: message + " | Sent from: " + email,
      html: `<div>${message}</div><p>Sent from:
      ${email}</p>`
    }

    transport.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })

    // res.status(200)
    return NextResponse.json("message sent");
  } catch(err) {
    console.log('[CONTACT_POST] ', err);
    return new NextResponse("Internal Error", {status:500})
  }
}
