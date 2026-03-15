import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log(`Server start on port 5000`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
