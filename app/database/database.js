import mongoose from "mongoose";

const connectURI = process.env.connectURI;

const dbConnect = async()=> {
  try {
    await mongoose.connect(connectURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("DB connection error :", error.message);
  }
}

export { dbConnect };
