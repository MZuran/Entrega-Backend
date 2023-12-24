import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  contents: { type: Array, required: true }
});

const cartModel = model("products", cartSchema);

export { cartModel };