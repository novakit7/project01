import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

//  wrap in async function
const startServer = async () => {
  try {
    await connectDB(); 

    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);
    app.use("/quote", quoteRoutes);
    app.use((err, req, res, next) => {
  console.error("🔥 FULL ERROR BELOW:");
  console.error(err);        // 👈 ADD THIS
  console.error(err.stack);  // 👈 AND THIS

  res.status(500).json({
    message: err.message,
    stack: err.stack   // 👈 TEMPORARY (for debugging)
  });
});

    app.listen(5000, () => console.log("Server running"));
  } catch (err) {
    console.error("Server error:", err);
  }
};

startServer();

