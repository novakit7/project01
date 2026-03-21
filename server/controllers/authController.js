import OtpTemp from "../models/otpTemp.js";
import User from "../models/User.js";
import sendMail from "../utils/sendEmail.js";
import generateToken from "../utils/GenrateToken.js";

// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Prevent spam (30 sec cooldown)
    const existingOtp = await OtpTemp.findOne({ email });
    if (existingOtp && Date.now() - existingOtp.createdAt < 30000) {
      return res.status(429).json({ message: "Wait 30 sec before retry" });
    }

    // Delete old OTPs
    await OtpTemp.deleteMany({ email });

    // Send OTP
    const otp = await sendMail(email);

    // Store OTP + user data
    await OtpTemp.create({
      name,
      email,
      password,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
    });

    res.json({ message: "OTP sent" });

  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= SIGNUP =================
export const signup = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OtpTemp.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ FIX: convert both to string
    if (record.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Double-check user doesn’t already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (password hashed in model)
    const user = await User.create({
      name: record.name,
      email: record.email,
      password: record.password,
    });

    // Clean OTP data
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
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

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
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};