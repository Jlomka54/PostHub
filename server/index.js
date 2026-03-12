import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

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
