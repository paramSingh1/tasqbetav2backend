import mongoose from "mongoose";
import config from 'config';

async function connectDB() {
    try {
        await mongoose.connect(config.get("mongodb"));
        console.log('MongodB Connected');
    } catch (err) {
        console.log(err);
    }
}
connectDB();