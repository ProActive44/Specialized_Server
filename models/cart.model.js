const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "product", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  discount: { type:Number, required: true},
  price: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  color: [{ type: String }],
});

const cartModel = model("cart", cartSchema);

module.exports = cartModel;
