import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    credits: {
        sms: {
            type: Number,
            required: true,
            default: 20
        },
        email: {
            type: Number,
            required: true,
            default: 100
        }
    },
    location: {
        type: String
    },
    profilepic: {
        type: String,
        required: true
    }
});
const userProfileModel = new mongoose.model("UserProfile", userProfileSchema, "userprofile");

export default userProfileModel;
