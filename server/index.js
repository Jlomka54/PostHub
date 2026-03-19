import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRoutes);
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.syncIndexes();
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
