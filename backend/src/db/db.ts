import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGO_DBNAME}`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
