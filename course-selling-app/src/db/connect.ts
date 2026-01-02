import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables"); 
}

export const connectDb = async () => {
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("database connection failed", error);
        process.exit(1);
    }
};