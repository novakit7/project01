import mailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (email) => {
  try {
    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return otp;
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Failed to send email");
  }
};

export default sendMail;