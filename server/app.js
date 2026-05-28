import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comment.js";
import User from "./models/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

let isConnected = false;

async function connectDB(req, res, next) {
  try {
    if (isConnected) {
      return next();
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    await User.syncIndexes();

    isConnected = true;
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
}

app.get("/", (req, res) => {
  res.send("PostHub API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(connectDB);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

export default app;
