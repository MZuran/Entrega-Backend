import { Schema, model, mongoose } from "mongoose";

const contentSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "products" },
  amount: {type: Number, required: true}
});

const cartSchema = new Schema({
  contents: { type: [contentSchema], required: true }
})

cartSchema.pre('find', function() {
  this.populate("contents.product")
})

const cartModel = model("carts", cartSchema);

export { cartModel };