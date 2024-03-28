import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Checking env variables", process.env.connectURI);
const connectURI = "mongodb://localhost:27017"; // process.env.connectURI;
let isConnected = false;

const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Database already connected");
    return;
  }
  try {
    await mongoose.connect(connectURI);
    isConnected = true;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("DB connection error :", error.message);
  }
};

export { dbConnect };
