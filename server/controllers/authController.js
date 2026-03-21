// controllers/authController.js

import OtpTemp from "../models/otpTemp.js";
import User from "../models/User.js";
import sendMail from "../utils/sendEmail.js";
import generateToken from "../utils/GenrateToken.js";
import bcrypt from "bcryptjs";

//  SEND OTP
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const existingOtp = await OtpTemp.findOne({ email });
    if (existingOtp && Date.now() - existingOtp.createdAt < 30000) {
      return res.status(429).json({ message: "Wait 30 sec before retry" });
    }

    await OtpTemp.deleteMany({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = await sendMail(email);

    await OtpTemp.create({
      name,
      email,
      password: hashedPassword,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  VERIFY OTP + REGISTER
export const signup = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OtpTemp.findOne({ email });

    if (!record)
      return res.status(400).json({ message: "No OTP found" });

    if (record.expiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.create({
      name: record.name,
      email: record.email,
      password: record.password,
    });

    await OtpTemp.deleteMany({ email });

    res.json({
      message: "Registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};