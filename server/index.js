import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
connectDB();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/quote",quoteRoutes)

app.listen(5000, () => console.log("Server running"));