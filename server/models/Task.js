// /models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["Completed", "Pending", "Backlog"],
    default: "Pending",
  },
  dueDate: Date,
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);