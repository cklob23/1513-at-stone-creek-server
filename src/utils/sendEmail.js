import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Loads .env into process.env


/**
 * Sends an email with the given HTML body to a specified email address
 *
 * @param {string} email - The recipient of the email.
 * @param {string} htmlBody - The HTML content of the email.
 * @param {Buffer} subject - The subject of the email.
 */

export async function sendEmail(email, htmlBody, subject) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SECRET,
    },
    logger: true,
    debug: true,
  });

  const info = {
    from: `"1513 at Stone Creek Inquiry" <1513atstonecreek.inquiries@gmail.com>`,
    to: email,
    subject: subject,
    html: htmlBody,
  };
  try {
    const mailInfo = await transporter.sendMail(info, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent successfully.`);
        return mailInfo;
      }
    });
  } catch (err) {
    console.log("Error sending email:", err);
    throw err;
  }
}
