import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try { await db.query("SELECT 1"); res.json({ status: "healthy" }); }
  catch { res.status(500).json({ status: "database unavailable" }); }
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
