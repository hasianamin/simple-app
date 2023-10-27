import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Your database connection URL
const dbURL = process.env.MONGODB_URI;

// Database connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbURL, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToDatabase;
