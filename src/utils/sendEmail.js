import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(email, htmlBody, subject) {
  const transporter = nodemailer.createTransport({
    host: "imap.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SECRET, // Gmail App Password
    },
  });

  const mailInfo = {
    from: `"1513 at Stone Creek Inquiry" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: htmlBody,
  };

  return transporter.sendMail(mailInfo);
}
