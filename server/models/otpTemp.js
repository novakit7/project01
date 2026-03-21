import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
  expiresAt: Date,
});

export default mongoose.model("OtpTemp", schema);