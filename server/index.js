import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running"));