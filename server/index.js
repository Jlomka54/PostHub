import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRoutes);
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
