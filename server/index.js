import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import User from "./models/User.js";
import fileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env"), quiet: true });

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    await User.syncIndexes();
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
}

start();
