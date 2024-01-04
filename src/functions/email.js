import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'invester.ph@gmail.com',
        pass: 'jzgvamlglkgotdpk',
    },
});
transporter.verify().catch(console.error);

export function sendEmail(toString, about, text){
    transporter.sendMail({
        from: '"iPH" <invester.ph@gmail.com>',
        to: toString,
        subject: about,
        text: text
    }).catch(console.error)
}