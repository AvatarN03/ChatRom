import mongoose from 'mongoose';


const connectDB  = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("The DB connected")
    } catch (error) {
        console.log("The DB connection error", error)
    }
}

export default connectDB;