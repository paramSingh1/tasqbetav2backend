import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  verified: {
    emailverified: {
      type: Boolean,
      default: false,
    },
    smsverified: {
      type: Boolean,
      default: false,
    },
  },
  tokens: {
    emailtoken: {
      type: String,
      required: true,
    },
    smstoken: {
      type: String,
      required: true,
    },
  },
  locked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userModel = new mongoose.model("User", userSchema, "userdata");

export default userModel;
