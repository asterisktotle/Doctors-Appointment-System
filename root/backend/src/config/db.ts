import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
    try{   
         const conn = await mongoose.connect(env.MONGODB_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
         })
         console.log(`MongoDB connected: ${conn.connection.name}`)
        
    }catch(error){
        console.error('Database connection failed: ', error)
        process.exit(1);
    }
}