import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true },
  contents: { type: String, required: true },
  date: { type: Date, required: true }
});

const messageModel = model("messages", messageSchema);

export { messageModel };