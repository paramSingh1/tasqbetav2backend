import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
})

const adminModel = new mongoose.model("Admin", adminSchema, "admindata");

export default adminModel;
