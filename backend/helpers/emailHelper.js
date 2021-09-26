import nodemailer from 'nodemailer';
import config from 'config';

async function sendMail(email, subject, html) {
    let transporter = nodemailer.createTransport({
        host: "mail.param.dev",
        port: 465,
        secure: true,
        auth: {
            user: config.get("emailserver").username,
            pass: config.get("emailserver").password,
        }
    });
    await transporter.sendMail({
        from: '"TasQ Solutions " <no-reply@param.dev>',
        to: email,
        subject: subject,
        html: html
    });
}
export default sendMail;