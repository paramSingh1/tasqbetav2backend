import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userToDoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todos: {
    type: [
      {
        task: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        clientduedate: {
          type: String,
          required: true,
        },
        serverduedate: {
          type: Date,
          required: true,
        },
        note: {
          type: String,
        },
        notificationType: {
          type: String,
          required: true,
          default: "email",
        },
        priority: {
          type: String,
          required: true,
        },
        clientreminders: {
          type: Array,
          required: true,
        },
        serverreminders: {
          type: Array,
          required: true,
        },
        timezone: {
          type: String,
          required: true,
        },
      },
    ],
  },
});
const userToDoModel = new mongoose.model(
  "UserTodo",
  userToDoSchema,
  "usertodos"
);

export default userToDoModel;
