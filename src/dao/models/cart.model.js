import { Schema, model } from "mongoose";

const contentSchema = new Schema({
  product_id: { type: String, required: true },
  amount: {type: Number, required: true}
});

const cartSchema = new Schema({
  contents: { type: [contentSchema], required: true }
});

const cartModel = model("carts", cartSchema);

export { cartModel };