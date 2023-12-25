import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  contents: { type: Array, required: true }
});

const cartModel = model("carts", cartSchema);

export { cartModel };