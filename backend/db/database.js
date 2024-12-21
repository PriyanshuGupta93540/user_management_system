import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (req, res) => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongodb": ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Mongo Db connection failed", error);
  }
};

export default connectDb;
